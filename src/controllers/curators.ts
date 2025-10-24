import { RequestHandler } from "express";
import prisma from "../prisma.js";

export const getCurators: RequestHandler = async (req, res, next) => {
    const curators = await prisma.curator.findMany();

    res.status(200).json({curators})
}