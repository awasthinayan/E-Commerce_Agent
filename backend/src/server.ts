import express from "express";
import cors from "cors";
import { connectDB } from "./config/dbConfig";
import userRoutes from "./routes/userRoutes";
import chatRoutes from "./routes/chatRoutes";
import { PORT } from "./config/envConfig";
import { errorHandler } from "./Middleware/ErrorMiddleware";
import aiRoute from "./routes/aiRoute";


const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/chat", chatRoutes);
app.use("/api", userRoutes);
app.use("/ai", aiRoute);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});