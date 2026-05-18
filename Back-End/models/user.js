import mongoose from "mongoose";
import bcrypt from "bcrypt";

//What will appear on database
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePictureUrl: {
      type: String,
      default: "",
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    isVerified: {
      type: Boolean,
      required: false,
    },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
    // otp: {
    //   type: String,
    // },
    // otpExpiry: {
    //   type: Date,
    // },
  },
  {
    timestamps: true,
  }
);

//Hash them passwords boi
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

export const User = mongoose.model("User", userSchema);
