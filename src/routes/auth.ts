import { Router } from "express";
import * as authControllers from "../controllers/auth.js";
import * as validation from "../middleware/validation.js";
import authenticated from "../middleware/authenticated.js";

const router = Router();

router.post("/registration", validation.register, authControllers.register);
router.post("/login", authControllers.login);
router.get("/email-confirmation/:token", authControllers.acceptEmail);
router.post("/student", validation.loginStudent, authControllers.loginStudent);
router.post("/verification-code", authControllers.sendVerificationCode);
router.post("/reset-password", authControllers.resetPassword);
router.get("/me", authenticated, authControllers.getMe);

export default router;