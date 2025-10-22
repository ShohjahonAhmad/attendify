import * as schemas from "./schemas.js";
const validateBody = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
        res.status(400).json({ error: result.error.issues });
        return;
    }
    next();
};
export const register = validateBody(schemas.CreateCurator);
