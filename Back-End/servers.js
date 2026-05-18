import dns from "node:dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { connectDB } from "./config/db.js";
import userauthRoutes from "./routes/userauthRoutes.js";
import personalRoutes from "./routes/personalRoutes.js";

dotenv.config({ path: "./.env" });
connectDB();
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
//User Route connect to use and test on Postman
app.use("/api/userauth", userauthRoutes);
// app.get("/", (req, res) => {
//   res.send("Server Test");
// });

//Personal Route connect to use and test on postman
app.use("/api/personal", personalRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
