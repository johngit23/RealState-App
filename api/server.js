import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import testRoutes from "./routes/test.route.js";
import postRoutes from "./routes/post.route.js";
import chatRoutes from "./routes/chat.route.js";
import messageRoutes from "./routes/message.route.js";

const app = express();

// routes middleware
dotenv.config();
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/test", testRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000 Yay");
});
