import express from "express";

import {
  createTask,
  getAllUserTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getUserTaskByHeading,
} from "../controller/task-controller";
import validateUsers from "../middlewares/auth-middlewares";

const router = express.Router();

router.use(validateUsers);

router.post("/create", validateUsers, createTask);
router.get("/get-all", validateUsers, getAllUserTasks);
router.get("/one-by-id/:id", validateUsers, getTaskById);
router.get("/search-by-heading/:heading", validateUsers, getUserTaskByHeading);
router.put("/update/:id", validateUsers, updateTask);
router.delete("/delete/:id", validateUsers, deleteTask);

export default router;
