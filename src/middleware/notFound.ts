import { RequestHandler } from "express";

const notFound: RequestHandler = (req, res, next) => {
    next(new Error("404"));
}

export default notFound;