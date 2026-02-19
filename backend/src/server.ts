import express from "express";
import cors from "cors";
import { connectDB } from "./config/dbConfig";
import userRoutes from "./routes/userRoutes";
import chatRoutes from "./routes/chatRoutes";
import { ENV } from "./config/envConfig";
import { errorHandler } from "./Middleware/ErrorMiddleware";
import aiRoute from "./routes/aiRoute";


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/chat", chatRoutes);
app.use("/api/users", userRoutes);
app.use("/ai", aiRoute);

app.use(errorHandler);

connectDB();

app.listen(ENV.PORT, () => {
  console.log(`🚀 Server running on port ${ENV.PORT}`);
});