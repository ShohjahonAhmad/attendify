import { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.log("Err message: ", err.message);
    console.log("Err code: ", err.code);
    console.log("Err stack: ", err.stack);

    if(err.code === "P2025"){
        res.status(404).json({error: "Resource not found"});
        return;
    }

    if(err.code === "P2002"){
        const conflictedItem = err.meta?.target[1] || err.meta?.target[0];
        res.status(409).json({error: `This ${conflictedItem} is already used`});
        return;
    }

    if(err.message === "404"){
        res.status(404).json({error: "Route not found"});
        return;
    }

    res.status(500).json({error: "Internal Server Error"});
}

export default errorHandler;