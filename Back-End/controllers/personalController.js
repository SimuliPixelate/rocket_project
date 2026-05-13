import Learning from "../models/personal.js";
// ----------------------------------------
// @desc    Get all learnings of logged-in user
// @route   GET /api/learnings
// @access  Protected
// ----------------------------------------
//Get user data
export const getuserLearning = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await Learning.countDocuments({ userId: req.user._id });
    const learnings = await Learning.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      learnings,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      total,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ----------------------------------------
// @desc    Create a new learning
// @route   POST /api/learnings
// @access  Protected
// ----------------------------------------
//Create personal learning
export const createuserLearning = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description are required" });
    }

    const learning = await Learning.create({
      userId: req.user._id,
      title,
      description,
    });

    res
      .status(201)
      .json({ message: "Learning created successfully", learning });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ----------------------------------------
// @desc    Update a learning
// @route   PUT /api/learnings/:id
// @access  Protected
// ----------------------------------------
//Update specific personal learning based on Id
export const updateuserLearning = async (req, res) => {
  try {
    const { title, description } = req.body;

    const learning = await Learning.findById(req.params.id);

    if (!learning) {
      return res.status(404).json({ message: "Learning not found" });
    }

    // Make sure the learning belongs to the logged-in user
    if (learning.userId.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this learning" });
    }

    learning.title = title || learning.title;
    learning.description = description || learning.description;
    await learning.save();

    res
      .status(200)
      .json({ message: "Learning updated successfully", learning });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ----------------------------------------
// @desc    Delete a learning
// @route   DELETE /api/learnings/:id
// @access  Protected
// ----------------------------------------
//Delete specific personal learning based on Id
export const deleteuserLearning = async (req, res) => {
  try {
    const learning = await Learning.findById(req.params.id);

    if (!learning) {
      return res.status(404).json({ message: "Learning not found" });
    }

    // Make sure the learning belongs to the logged-in user
    if (learning.userId.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this learning" });
    }

    await learning.deleteOne();

    res.status(200).json({ message: "Learning deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
