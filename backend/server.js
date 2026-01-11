import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import gigRoutes from "./routes/gigRoutes.js";


dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// Test route
app.get("/", (req, res) => {
  res.send("GigFlow API is running...");
});

const PORT = process.env.PORT || 5000;

app.use("/api/auth", authRoutes);

app.use("/api/gigs", gigRoutes);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
