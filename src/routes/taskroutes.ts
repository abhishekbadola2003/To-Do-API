import express from "express";
import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controller/taskcontroller";
import validUsers from "src/middlewares/authmiddlewares";

const router = express.Router();

router.post("/create", validUsers, createTask);
router.get("/getall", validUsers, getAllTasks);
router.get("/onebyid", validUsers, getTaskById);
router.put("/update", validUsers, updateTask);
router.delete("/delete", validUsers, deleteTask);

export default router;
