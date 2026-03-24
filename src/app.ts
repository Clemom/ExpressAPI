import express from "express";
import userRoutes from "./routes/auth.route";
import { errorMiddleware } from "./middlewares/error.middleware";

const app = express();

app.use(express.json());

app.use("/auth", userRoutes);

app.use(errorMiddleware);

export default app;