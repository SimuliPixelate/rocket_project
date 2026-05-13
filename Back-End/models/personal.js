import mongoose from "mongoose";

//What will appear on database
const personalSchema = new mongoose.Schema(
  {
    userId: {
      //referring sa user.js
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Personal = mongoose.model("Personal", personalSchema);

export default Personal;
