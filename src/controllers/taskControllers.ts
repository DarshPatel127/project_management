import asyncHandler from "../utils/asyncHandler";
import { createTask } from "../services/taskService/taskCreate";
import { db } from "../db/db";
import APIError from "../utils/apiError";
import { employeeTasks } from "../services/taskService/getemployeeTasks";
import { deleteProject } from "../services/projectService/projectDelete";
import { deleteTask } from "../services/taskService/taskDelete";
import { tasks } from "../db/schema/tasks";
import { eq } from "drizzle-orm";
import { projects } from "../db/schema/projects";
import { markTask } from "../services/taskService/markTask";

export const CreatedTask = asyncHandler(async (req, res, next) => {
    const { title, description, projectId, employeeId } = req.body;

    if (!title || !projectId|| !employeeId){
        throw new APIError ("Invalid input data",400);
    }

    const newTask = await createTask(title, description, projectId, employeeId);

    res.status(201).json({
        success: true,
        data: newTask
    });
});

export const GetEmployeeTasks = asyncHandler(async (req, res, next) => {
    const employee = req.user;
    if (employee) {
        const employeeId = employee.id;
    }else{
        throw new APIError("User not found", 404);
    }

    const tasks = await employeeTasks(Number(employee.id));
    console.log(tasks);
    console.log(employee.id);
    console.log(req.user);

    res.status(200).json({
        success: true,
        data: tasks
    });
});

export const DeleteTask = asyncHandler(async (req, res, next) => {
    const { taskId } = req.params;
    
    if (taskId.length == 0) {
        throw new APIError("Invalid task ID", 400);
    }
    const deletedTask = await deleteTask(Number(taskId));

    res.status(200).json({
        success: true,
        data: deletedTask
    });
});

export const MarkTask = asyncHandler(async (req, res, next) => {
    const { status } = req.body;
    const taskId = parseInt(req.params.taskId, 10);
    const userId = req.user?.id;
    if (!taskId || !status || !userId) {
        throw new APIError("Invalid input data", 400);
    }
    if (status !== "completed" && status !== "not_completed") {
        throw new APIError("Invalid status value", 400);
    }
    const updatedTask = await markTask(taskId, status, userId);
    res.status(200).json({
        success: true,
        data: updatedTask
    });
});