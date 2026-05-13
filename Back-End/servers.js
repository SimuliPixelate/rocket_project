import dns from "node:dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import { connectDB } from "./config/db.js";
import userauthRoutes from "./routes/userauthRoutes.js";
import personalRoutes from "./routes/personalRoutes.js";

dotenv.config();
connectDB();
const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

//User Route connect to use and test on Postman
app.use("/api/userauth", userauthRoutes);
// app.get("/", (req, res) => {
//   res.send("Server Test");
// });

//Personal Route connect to use and test on postman
app.use("/api/learning", personalRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
