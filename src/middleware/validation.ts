import z from 'zod';
import * as schemas from "./schemas.js";
import { RequestHandler } from 'express';

export const validateParamsId: RequestHandler = (req, res, next) => {
    const result = z.number().int().nonnegative().safeParse(parseInt(req.params.id));

    if(!result.success){
        res.status(400).json({error: result.error.issues});
        return;
    }

    next();
}

const validateBody = (schema: z.ZodType):RequestHandler => (req, res, next) => {
    const result = schema.safeParse(req.body);

    if(!result.success){
        res.status(400).json({error: result.error.issues});
        return;
    }

    next();
};


export const register = validateBody(schemas.CreateCurator);
export const login = validateBody(schemas.LoginCurator);
export const course = validateBody(schemas.CreateCourse);