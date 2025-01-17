import { Request, Response } from "express";
import { Task } from "../models/tasks";
import { User } from "src/models/user";
import { error } from "console";

export const createTask = async (req: Request, res: Response) => {
  const { heading, description, status, publishedDate, userId } = req.body;
  // console.log("Request Body id:", req.body.id);
  const headingRegex = /^[a-zA-Z0-9 +=:-_]{1,40}$/;
  const descriptionRegex = /^[a-zA-Z0-9 +=:-]{1,200}$/;
  const dateRegex = /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|1[0-2]|2[0-9]|3[0-1])$/;

  if (!userId) {
    throw new Error("Unauthorized user");
  }
  if (!heading || !description || !status || !publishedDate) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  if (!headingRegex.test(heading)) {
    res.status(400).json({
      success: false,
      message:
        "HEADING INVALID, the heading should be minimum of single letter and maximum of 20 letters",
      error,
    });
  }

  if (!descriptionRegex.test(description)) {
    res.status(400).json({
      success: false,
      message:
        "DESCRIPTION INVALID, the heading should be minimum of single letter and maximum of 20 letters",
      error,
    });
  }

  if (!dateRegex.test(publishedDate)) {
    res.status(400).json({
      success: false,
      message:
        " INVALID DATE FORMAT, the DATE should be in [ YYYY-MM-DD ] format",
      error,
    });
  }

  try {
    const task = await Task.create({
      userID: userId,
      heading,
      description,
      status,
      publishedDate,
    });

    // console.log("Decoded Token:", req.body);
    // console.log(`userid :${userId}`);

    res.status(201).json({
      success: true,
      message: "User create successfully",
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in creating task",
      error: (error as Error).message,
    });
  }
};

export const getAllUserTasks = async (req: Request, res: Response) => {
  const { userId } = req.body;
  try {
    const tasks = await Task.find({ userID: userId });

    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching tasks",
      error: (error as Error).message,
    });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  const { userId } = req.body;
  try {
    const task = await Task.findOne({ _id: req.params.id, userID: userId });
    if (!task) {
      throw new Error("Task not found"); //not
    }

    task.status = req.body.status || task.status;
    await task.save();
    res.status(200).json({
      success: true,
      message: "Task updated",
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating task",
      error: (error as Error).message,
    });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const { userId } = req.body;
  try {
    if (!userId) {
      throw new Error("Unauthorized user");
    }
    const task = await Task.findOne({ _id: req.params.id, userID: userId });
    if (!task) {
      throw new Error("Task not found");
    }

    await task.deleteOne();
    res.json({
      message: "Task deleted",
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting task",
      error: (error as Error).message,
    });
  }
};

export const getTaskById = async (req: Request, res: Response) => {
  const { userId } = req.body;
  try {
    if (!userId) {
      throw new Error("Unauthorized user");
    }
    const task = await Task.findOne({
      _id: req.params.id,
      userID: userId,
    });
    if (!task) {
      throw new Error("Task not found");
    }
    res.json({ task });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching task",
      error: (error as Error).message,
    });
  }
};

export const getUserTaskByHeading = async (req: Request, res: Response) => {
  const { heading } = req.params;
  const { userId } = req.body;
  try {
    if (!heading) {
      throw new Error("Heading is required");
    }

    const task = await Task.findOne({
      heading,
      userID: userId,
    });

    if (!task) {
      throw new Error("Task not found with the given heading");
    }
    res.status(200).json({
      success: true,
      message: "task found successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching task with the given heading",
      error: (error as Error).message,
    });
  }
};
