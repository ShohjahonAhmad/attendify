import { Router } from "express";
import * as attendancesControllers from "../controllers/attendances.js";
const router = Router();
router.post("/", attendancesControllers.createAttendance);
export default router;
