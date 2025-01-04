"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.getTaskById = exports.getAllTasks = exports.createTask = void 0;
const tasks_1 = require("../models/tasks");
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { heading, description, status } = req.body;
    console.log(req.body);
    try {
        const task = yield tasks_1.Task.create({
            // user: req.user.id,
            heading,
            description,
            status,
        });
        console.log(req);
        res.status(201).json({ message: "Task created successfully", task });
    }
    catch (error) {
        res.status(500).json({ message: "Error in creating task", error });
    }
});
exports.createTask = createTask;
const getAllTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield tasks_1.Task.find();
        {
            // user: req.user.id;
        }
        res.json({ tasks });
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching tasks", error });
    }
});
exports.getAllTasks = getAllTasks;
const getTaskById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield tasks_1.Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.json({ task });
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching task", error });
    }
});
exports.getTaskById = getTaskById;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield tasks_1.Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        task.status = req.body.status || task.status;
        yield task.save();
        res.json({ message: "Task updated", task });
    }
    catch (error) {
        res.status(500).json({ message: "Error updating task", error });
    }
});
exports.updateTask = updateTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield tasks_1.Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        yield task.deleteOne();
        res.json({ message: "Task deleted" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting task", error });
    }
});
exports.deleteTask = deleteTask;
