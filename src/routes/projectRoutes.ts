import { Router } from "express";
import { DeleteProject, GetProjects, NewProject } from "../controllers/projectControllers";
import { authMiddleware } from "../middlewares/authMiddleware";
import { isProjectManager } from "../middlewares/pmMiddleware";

const router = Router();

router.use(authMiddleware, isProjectManager);
router.post('/create', NewProject);
router.get('/', GetProjects);
router.delete('/:id', DeleteProject);

export default router;