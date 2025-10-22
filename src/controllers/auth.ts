import { RequestHandler } from "express";
import prisma from "../prisma.js";
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import confirmEmail from "../utils/confirmEmail.js";

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
    res.sendStatus(200);
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