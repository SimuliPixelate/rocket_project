import express from "express";
import mongoose from "mongoose";
import {
  getuserLearning,
  getuserLearningAll,
  createuserLearning,
  updateuserLearning,
  deleteuserLearning,
} from "../controllers/personalController.js";
import { verifyToken } from "../middleware/userauthMiddleware.js";

//get - catch them datas all
//create - make/add new learning
//put - update existing create learning
//delete - remove data
const personalRoute = express.Router();

personalRoute.get("/users/:id", verifyToken, getuserLearning);
personalRoute.get("/users", verifyToken, getuserLearningAll);
personalRoute.post("/user", verifyToken, createuserLearning);
personalRoute.put("/update/user/:id", verifyToken, updateuserLearning);
personalRoute.delete("/delete/user/:id", verifyToken, deleteuserLearning);

export default personalRoute;
