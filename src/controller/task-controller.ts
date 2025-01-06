import { Request, Response } from "express";
import { Task } from "../models/tasks";

export const createTask = async (req: Request, res: Response) => {
  const { heading, description, status, publishedDate } = req.body;
  // console.log("Request Body id:", req.body.id);

  try {
    const task = await Task.create({
      user: req.body.user.id,
      heading,
      description,
      status,
      publishedDate,
    });
    if (!heading || !description || !status || !publishedDate) {
      return res.status(400).json({ message: "All fields are required" });
    }
    console.log("Decoded Token:", req.body);

    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    res.status(500).json({ message: "Error in creating task", error });
  }
};

export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find();
    {
      user: req.body;
    }
    res.json({ tasks });
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
};

export const getTaskById = async (req: Request, res: Response) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ task });
  } catch (error) {
    res.status(500).json({ message: "Error fetching task", error });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.status = req.body.status || task.status;
    await task.save();

    res.json({ message: "Task updated", task });
  } catch (error) {
    res.status(500).json({ message: "Error updating task", error });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await task.deleteOne();
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error });
  }
};
