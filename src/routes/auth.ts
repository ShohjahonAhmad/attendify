import { Router } from "express";
import * as authControllers from "../controllers/auth.js"
import * as validation from "../middleware/validation.js";

const router = Router();

router.post("/registration", validation.register, authControllers.register);
router.post("/login", authControllers.login);
router.get("/email-confirmation/:token", authControllers.acceptEmail);

export default router;