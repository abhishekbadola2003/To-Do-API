import mongoose, { Schema } from "mongoose";

const tasks = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  heading: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["completed", "pending"],
    required: true,
  },
  publishedDate: {
    type: String,
    required: true,
  },
});

export const Task = mongoose.model("Task", tasks);
