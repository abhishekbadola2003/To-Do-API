import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
const validUsers = (req: any, res: any, next: any) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY || "");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

export default validUsers;