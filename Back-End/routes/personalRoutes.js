import express from "express";
import mongoose from "mongoose";
import {
  getuserLearning,
  createuserLearning,
  updateuserLearning,
  deleteuserLearning,
} from "../controllers/personalController.js";

//get - catch them datas all
//create - make/add new learning
//put - update existing create learning
//delete - remove data

const personalRoute = express.Router();

personalRoute.get("/", getuserLearning);
personalRoute.post("/", createuserLearning);
personalRoute.put("/:id", updateuserLearning);
personalRoute.delete("/:id", deleteuserLearning);

export default personalRoute;
