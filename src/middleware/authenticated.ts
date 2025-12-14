import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

const authenticated: RequestHandler = (req, res, next) => {
    try{
        const authHeader = req.headers.authorization!;
        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!);
        req.user = decoded;
        next();
    } catch(err){
        res.status(401).json("Unauthenticated");
    }
}

export default authenticated;