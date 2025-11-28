import dotenv from "dotenv";
dotenv.config();
import express from "express";
import type{ Request, Response, NextFunction } from "express";
import cors from "cors";
import connectDB from "./configs/db.ts";
import authRoutes from "./routes/authRoute.ts";


const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

await connectDB();

app.get("/", (req: Request, res: Response) => res.send("Server is live..."));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);


app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
