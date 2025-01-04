import express from "express";
import dotenv from "dotenv";

import authRoutes from "../src/routes/authroutes";
import taskroutes from "../src/routes/taskroutes";

dotenv.config();
const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/task", taskroutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
