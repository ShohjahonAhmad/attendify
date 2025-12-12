import { RequestHandler } from "express";

const isStudent: RequestHandler = (req, res, next) => {
    if(req.user?.role !== "STUDENT"){
        res.status(403).json({error: "Access denied: User is not a student"});
        return;
    };

    next();
}

// Middleware to restrict access to routes for users with the "STUDENT" role.
export default isStudent;