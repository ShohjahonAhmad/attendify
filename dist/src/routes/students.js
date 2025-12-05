import { Router } from "express";
import * as studentsController from "../controllers/students.js";
import * as validation from "../middleware/validation.js";
const router = Router();
router.post("/bulk", validation.bulkStudents, studentsController.createStudents);
export default router;
