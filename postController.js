const Post = require("../models/Post");

exports.createPost = async (req, res) => {
  try {
    const { title, platform, status, scheduledDate, reminderAt, notes } = req.body;
    if (!title || !platform || !scheduledDate) {
      return res.status(400).json({ message: "title, platform, and scheduledDate are required" });
    }
    const post = await Post.create({
      user: req.userId,
      title,
      platform,
      status: status || "idea",
      scheduledDate,
      reminderAt,
      notes,
    });
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getPosts = async (req, res) => {
  // Optional range filter: ?from=ISO&to=ISO
  const { from, to } = req.query;
  const filter = { user: req.userId };
  if (from || to) {
    filter.scheduledDate = {};
    if (from) filter.scheduledDate.$gte = new Date(from);
    if (to) filter.scheduledDate.$lte = new Date(to);
  }
  const posts = await Post.find(filter).sort({ scheduledDate: 1 });
  res.json(posts);
};

exports.updatePost = async (req, res) => {
  const post = await Post.findOneAndUpdate(
    { _id: req.params.id, user: req.userId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.json(post);
};

// Lightweight endpoints for drag-drop: only touch the one field being moved
exports.moveDate = async (req, res) => {
  const { scheduledDate } = req.body;
  if (!scheduledDate) return res.status(400).json({ message: "scheduledDate is required" });
  const post = await Post.findOneAndUpdate(
    { _id: req.params.id, user: req.userId },
    { scheduledDate },
    { new: true }
  );
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.json(post);
};

exports.moveStatus = async (req, res) => {
  const { status } = req.body;
  if (!status) return res.status(400).json({ message: "status is required" });
  const post = await Post.findOneAndUpdate(
    { _id: req.params.id, user: req.userId },
    { status },
    { new: true }
  );
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.json(post);
};

exports.deletePost = async (req, res) => {
  const result = await Post.findOneAndDelete({ _id: req.params.id, user: req.userId });
  if (!result) return res.status(404).json({ message: "Post not found" });
  res.json({ message: "Deleted" });
};

// Posts with a reminder in the next 24 hours that hasn't passed
exports.getUpcomingReminders = async (req, res) => {
  const now = new Date();
  const in24h = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  const posts = await Post.find({
    user: req.userId,
    reminderAt: { $gte: now, $lte: in24h },
  }).sort({ reminderAt: 1 });
  res.json(posts);
};
