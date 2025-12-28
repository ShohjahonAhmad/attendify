import z from 'zod';
import * as schemas from "./schemas.js";
export const validateParamsId = (req, res, next) => {
    const result = z.number().int().nonnegative().safeParse(parseInt(req.params.id));
    if (!result.success) {
        res.status(400).json({ error: result.error.issues });
        return;
    }
    next();
};
const validateBody = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
        res.status(400).json({ error: result.error.issues });
        return;
    }
    next();
};
export const register = validateBody(schemas.CreateCurator);
export const login = validateBody(schemas.LoginCurator);
export const course = validateBody(schemas.CreateCourse);
export const bulkStudents = validateBody(schemas.BulkCreateStudent);
export const loginStudent = validateBody(schemas.LoginStudent);
export const markAttendance = validateBody(schemas.AttendanceSchema);
export const passwordResetEmail = validateBody(schemas.PasswordResetEmail);
export const resetPassword = validateBody(schemas.PasswordReset);
