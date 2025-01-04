"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const taskcontroller_1 = require("../controller/taskcontroller");
const authmiddlewares_1 = __importDefault(require("src/middlewares/authmiddlewares"));
const router = express_1.default.Router();
router.post("/create", authmiddlewares_1.default, taskcontroller_1.createTask);
router.get("/getall", authmiddlewares_1.default, taskcontroller_1.getAllTasks);
router.get("/onebyid", authmiddlewares_1.default, taskcontroller_1.getTaskById);
router.put("/update", authmiddlewares_1.default, taskcontroller_1.updateTask);
router.delete("/delete", authmiddlewares_1.default, taskcontroller_1.deleteTask);
exports.default = router;
