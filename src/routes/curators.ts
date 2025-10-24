import { Router } from "express";
import * as curatorsController from "../controllers/curators.js"

const router = Router();

router.get("/", curatorsController.getCurators);

export default router;