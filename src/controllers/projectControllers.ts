import { deleteProject } from "../services/projectService/projectDelete";
import { getManagerProjects } from "../services/projectService/getProjects";
import { createProject } from "../services/projectService/projectCreate";
import APIError from "../utils/apiError";
import asyncHandler from "../utils/asyncHandler";
import { Request, Response } from 'express';

export const NewProject = asyncHandler(async(req:Request,res:Response) => {
    const {name, description} = req.body;
    const managerId = req.user!.id;
    if(!name || !description) {
        throw new APIError("Name and description are required", 400);
    }
    const project = await createProject(name, description, managerId);
    res.status(201).json(project);
});


export const GetProjects = asyncHandler(async(req:Request,res:Response) => {
    if (!req.user) {
        throw new APIError("User not found", 404);
    }
    const projects = await getManagerProjects(req.user!.id);
    res.status(200).json(projects);
});

export const DeleteProject = asyncHandler(async(req:Request,res:Response) => {
    if (!req.params.id) {
        throw new APIError("Project ID is required", 400);
    }
    const projectId = parseInt(req.params.id);
    await deleteProject(projectId);
    res.status(204).send();
});