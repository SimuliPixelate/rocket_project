import express from "express";
import mongoose from "mongoose";
import path from "node:path";
import multer from "multer";
import {
  userregister,
  userlogin,
  userlogout,
  userverifyemail,
  userforgotpassword,
  userresetpassword,
  checkAuth,
  updatePersonalDetails,
  updateProfilePicture,
  updatePassword,
} from "../controllers/userauthController.js";
import { verifyToken } from "../middleware/userauthMiddleware.js";

const userRoute = express.Router();

// --- MULTER STORAGE CONFIGURATION ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(process.cwd(), "Back-End", "uploads");
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    const cleanName = path
      .basename(file.originalname, extension)
      .replace(/\s+/g, "_");
    cb(null, `${Date.now()}-${cleanName}${extension}`);
  },
});

// --- MULTER IMAGE FILTER ---
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

const upload = multer({ storage, fileFilter });

userRoute.get("/checkauth", verifyToken, checkAuth);
userRoute.post("/userregister", userregister);
userRoute.post("/userlogin", userlogin);
userRoute.post("/userlogout", userlogout);
userRoute.post("/userverifyemail", userverifyemail);
userRoute.post("/userforgotpassword", userforgotpassword);
userRoute.post("/userresetpassword/:token", userresetpassword);
userRoute.put("/update-details", verifyToken, updatePersonalDetails);
userRoute.put(
  "/update-profile-picture",
  verifyToken,
  upload.single("image"),
  updateProfilePicture
);
userRoute.put("/update-password", verifyToken, updatePassword);

export default userRoute;
