const errorHandler = (err, req, res, next) => {
    console.log("Err message: ", err.message);
    console.log("Err code: ", err.code);
    console.log("Err stack: ", err.stack);
    if (err.code === "P2025") {
        res.status(404).json({ error: "Resource not found" });
        return;
    }
    res.status(500).json({ error: "Internal Server Error" });
};
export default errorHandler;
