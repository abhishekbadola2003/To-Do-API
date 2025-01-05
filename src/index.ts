import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoutes from "./routes/auth-routes";
import taskRoutes from "./routes/task-routes";

dotenv.config();
const app = express();

app.use(express.json());

// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/task", taskRoutes);

// Handle invalid routes
app.use("*", (req, res) => {
  res.status(404).send({
    success: false,
    message: "invalid route",
    data: {},
    error: {},
  });
});

// Connect to MongoDB with error handling
(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection failed:", (error as Error).message);
    process.exit(1); // Exit the process with failure
  }
})();

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
