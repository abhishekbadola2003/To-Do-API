import dotenv from "dotenv";
dotenv.config(); // This loads the variables from .env file

import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user";

export const registerUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  try {
    if (!username || !email || !password) {
      throw new Error("Data is missing"); //extra Error
    }

    if (!emailRegex.test(email)) {
      res.status(400).json({
        success: false,
        message: "EMAIL INVALID, the email should be in proper syntax",
      });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in registering user",
      error: (error as Error).message, //wt if another error occurs it will show Error
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    // console.log(process.env.JWT_KEY); // This should log the JWT_KEY from the .env file
    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY || "", {
      expiresIn: "1h",
    });

    res.json({
      success: true,
      message: "Login successful",
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Invalid email or password",
      error: (error as Error).message,
    });
  }
};
