const notFound = (req, res, next) => {
    next(new Error("404"));
};
export default notFound;
