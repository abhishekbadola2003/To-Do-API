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
    throw new Error("No token, authorization denied");
  }
 
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY || "") as {
      id: String;
    };
    // req.body.user = decoded;
    req.body.userId = decoded.id;
    // console.log(req.body.userId);

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Token is not valid",
      error,
    });
  }
};

export default validateUsers;
