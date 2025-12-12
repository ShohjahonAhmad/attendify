import { Router } from "express";
import * as studentsController from "../controllers/students.js";
import * as validation from "../middleware/validation.js";
import isStudent from "../middleware/isStudent.js";
const router = Router();
router.post("/bulk", validation.bulkStudents, studentsController.createStudents);
router.post("/attendance", isStudent, validation.markAttendance, studentsController.markAttendance);
export default router;
