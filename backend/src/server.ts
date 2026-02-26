import express from "express";
import cors from "cors";
import { connectDB } from "./config/dbConfig";
import userRoutes from "./routes/userRoutes";
import chatRoutes from "./routes/chatRoutes";
import authRoutes from "./routes/userRoutes";
import { PORT } from "./config/envConfig";
import { errorHandler } from "./Middleware/ErrorMiddleware";
import { authMiddleware } from "./Middleware/authMiddleware";
import aiRoute from "./routes/aiRoute";

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

// ✅ PUBLIC ROUTES (no auth required)
app.use("/api/auth", authRoutes);
app.get("/health", (req, res) => {
  res.send("Hello World!");
});

// ✅ PROTECTED ROUTES (auth required)
app.use("/api/chat", authMiddleware, chatRoutes);
app.use("/api/users", authMiddleware, userRoutes);
app.use("/ai", aiRoute);

// ✅ Error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});