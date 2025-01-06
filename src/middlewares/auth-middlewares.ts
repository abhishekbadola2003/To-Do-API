import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();

const validateUsers = (req: Request, res: Response, next: NextFunction) => {
  // const authHeader = req.header("Authorization");
  // console.log("Authorization Header:", authHeader);

  // const token = authHeader?.replace("Bearer ", "");
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY || "");
    req.body.user = decoded;
    // console.log(decoded);

    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

export default validateUsers;
