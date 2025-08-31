import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { MarkTask,DeleteTask, GetEmployeeTasks, CreatedTask, } from "../controllers/taskControllers";
import { isProjectManager } from "../middlewares/pmMiddleware";

const router = express.Router();

router.use(authMiddleware);
router.post("/create", isProjectManager, CreatedTask);
router.get("/getTasks", GetEmployeeTasks);

router.delete("/:taskId", DeleteTask);
router.put("/:taskId", MarkTask);

export default router;