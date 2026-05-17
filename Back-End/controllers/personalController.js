import Personal from "../models/personal.js";

export const getuserLearning = async (req, res) => {
  try {
    const { id } = req.params;
    const learnings = await Personal.find({ userId: id }).sort({
      createdAt: -1,
    });
    res.status(200).json(learnings);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const getuserLearningAll = async (req, res) => {
  try {
    const learnings = await Personal.find().sort({ createdAt: -1 });
    res.status(200).json(learnings);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const createuserLearning = async (req, res) => {
  try {
    const { userId, title, description, image } = req.body;
    if (!userId || !title || !description) {
      return res
        .status(400)
        .json({ message: "userId, title, and description are required" });
    }
    const newLearning = new Personal({ userId, title, description, image });
    const saved = await newLearning.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const updateuserLearning = async (req, res) => {
  try {
    const { id } = req.params;
    const learning = await Personal.findById(id);
    if (!learning)
      return res.status(404).json({ message: "Learning not found" });
    const updated = await Personal.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const deleteuserLearning = async (req, res) => {
  try {
    const { id } = req.params;
    const learning = await Personal.findById(id);
    if (!learning)
      return res.status(404).json({ message: "Learning not found" });
    await Personal.findByIdAndDelete(id);
    res.status(200).json({ message: "Learning deleted successfully" });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};
