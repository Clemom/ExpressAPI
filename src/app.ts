import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route";
import userRoutes from "./routes/user.route";
import { errorMiddleware } from "./middlewares/error.middleware";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/auth", authRoutes);
app.use("/api", userRoutes);

app.use(errorMiddleware);

export default app;
