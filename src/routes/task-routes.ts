import express from "express";
import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controller/task-controller";
import validUsers from "src/middlewares/auth-middlewares";

const router = express.Router();

router.post("/create", validUsers, createTask);
router.get("/get-all", validUsers, getAllTasks);
router.get("/one-by-id", validUsers, getTaskById);
router.put("/update", validUsers, updateTask);
router.delete("/delete", validUsers, deleteTask);

export default router;
