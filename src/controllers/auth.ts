import { RequestHandler } from "express";
import prisma from "../prisma.js";
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from "jsonwebtoken";
import confirmEmail from "../utils/confirmEmail.js";
import dotenv from 'dotenv';
dotenv.config()

export const register: RequestHandler = async (req, res, next) => {
    const { password, email, uniqueIdentifier } = req.body;
    const isEmailTaken = await prisma.curator.findFirst({
        where: {
            OR: [{email}, {uniqueIdentifier}]
        }
    }) 

    if(isEmailTaken){
        res.status(409).json({error: "Email or Unique Identifier already registered"});
        return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const token = crypto.randomBytes(32).toString('hex');
    const tokenExpiry = new Date(Date.now() + 1000 * 60 * 60 * 24);

    const curator = await prisma.curator.create({
        data: {
            ...req.body,
            password: hashedPassword
        },
        omit: {
            password: true
        }
    })
    await prisma.emailTokens.create({
        data: {
            token,
            expires: tokenExpiry,
            curatorId: curator.id,
        }
    })

    if( !(await confirmEmail(email, token)) ) {
        res.status(500).json({error: "Failed to send confirmation email"});
        return;
    }

    res.status(201).json({curator})
}

export const login: RequestHandler = async (req, res, next) => {
    const {email, password} = req.body;

    const curator = await prisma.curator.findUnique({
        where: {
            email
        }
    })

    if(!curator){
        res.status(401).json({error: "Invalid email or password"});
        return;
    }

    const isCorrectPassword = await bcrypt.compare(password, curator.password);

    if(!isCorrectPassword) {
        res.status(401).json({error: "Invalid email or password"});
        return;
    }

    const token = jwt.sign({id: curator.id, role: curator.role}, process.env.JWT_SECRET_KEY!, {
        expiresIn: '24h'
    })

    res.status(200).json({token})
}

export const acceptEmail: RequestHandler = async (req, res, next) => {
    const token = req.params.token;

    const emailToken = await prisma.emailTokens.findFirst({
        where: {
            token,
            expires: {
                gte: new Date()
            }
        }
    }) 

    if(!emailToken) {
        res.status(400).json({error: "Invalid or expired token"});
        return;
    }

    await prisma.curator.update({
        where: {
            id: emailToken.curatorId,
        }, data: {
            verified: true,
        }
    })

    res.status(200).json({message: "Your email is successfully verified!"})
}

export const loginStudent: RequestHandler = async (req, res, next) => {
    const {email, password} = req.body;

    const student = await prisma.student.findUnique({
        where: {
            email
        }
    });

    if(!student){
        res.status(401).json({error: "Invalid email or password"});
        return;
    }

    const isPasswordValid = await bcrypt.compare(password, student.password);

    if(!isPasswordValid){
        res.status(401).json({error: "Invalid email or password"});
        return;
    }

    const token = jwt.sign({id: student.id, role: 'STUDENT'}, process.env.JWT_SECRET_KEY!, {
        expiresIn: '365days'
    });

    res.status(200).json({token});
}

export const getMe: RequestHandler = async (req, res, next) => {
    const {id, role} = req.user!;

    if(role === "CURATOR"){
        const curator = await prisma.curator.findUnique({
            where: {id},
            omit: {password: true}
        })

        res.status(200).json({curator});
    } else {
        const student = await prisma.student.findUnique({
            where: {id},
            omit: {password: true}
        })

        res.status(200).json({student});
    }
    
}

export const sendVerificationCode : RequestHandler = (req, res, next) => {
    res.status(200).send("Good job!");
}

export const resetPassword : RequestHandler = (req, res, next) => { 
    res.status(200).send("Good job!");
}