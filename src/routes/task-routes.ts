import express from "express";
import validateUsers from "../middlewares/auth-middlewares";
import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controller/task-controller";

const router = express.Router();

router.post("/create", validateUsers, createTask);
router.get("/get-all", validateUsers, getAllTasks);
router.get("/one-by-id/:id", validateUsers, getTaskById);
router.put("/update/:id", validateUsers, updateTask);
router.delete("/delete/:id", validateUsers, deleteTask);

export default router;
