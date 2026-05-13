import express from "express";
import mongoose from "mongoose";
import {
  userregister,
  userlogin,
  userlogout,
  userverifyemail,
  userforgotpassword,
  userresetpassword,
  checkAuth,
} from "../controllers/userauthController.js";
import { verifyToken } from "../middleware/userauthMiddleware.js";

const userRoute = express.Router();

userRoute.get("/checkauth", verifyToken, checkAuth);
userRoute.post("/userregister", userregister);
userRoute.post("/userlogin", userlogin);
userRoute.post("/userlogout", userlogout);
userRoute.post("/userverifyemail", userverifyemail);
userRoute.post("/userforgotpassword", userforgotpassword);
userRoute.post("/userresetpassword/:token", userresetpassword);

export default userRoute;
