"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const task_controller_1 = require("../controller/task-controller");
const auth_middlewares_1 = __importDefault(require("src/middlewares/auth-middlewares"));
const router = express_1.default.Router();
router.post("/create", auth_middlewares_1.default, task_controller_1.createTask);
router.get("/get-all", auth_middlewares_1.default, task_controller_1.getAllTasks);
router.get("/one-by-id", auth_middlewares_1.default, task_controller_1.getTaskById);
router.put("/update", auth_middlewares_1.default, task_controller_1.updateTask);
router.delete("/delete", auth_middlewares_1.default, task_controller_1.deleteTask);
exports.default = router;
