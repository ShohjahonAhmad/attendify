import { Router } from "express";
import * as curatorsController from "../controllers/curators.js";
import * as validation from "../middleware/validation.js";

const router = Router();

router.get("/", curatorsController.getCurators);
router.get("/courses", curatorsController.getCourses);
router.delete("/:id", validation.validateParamsId, curatorsController.deleteCurator);

export default router;