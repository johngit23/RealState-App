import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json("User created successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to create user" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  const age = 1000 * 60 * 60 * 24 * 7;

  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, isAdmin: true },
      process.env.JWT_SECRET,
      {
        expiresIn: age,
      }
    );

    const { password: userPassword, ...userWithoutPassword } = user;

    res
      .cookie("token", token, {
        httpOnly: true,
        //secure: true,
        //sameSite: "none",
        maxAge: age,
      })
      .status(200)
      .json(userWithoutPassword);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to login" });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token").json({ message: "Logout successful" });
};
