const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  createPost,
  getPosts,
  updatePost,
  moveDate,
  moveStatus,
  deletePost,
  getUpcomingReminders,
} = require("../controllers/postController");

router.use(protect);
router.get("/reminders", getUpcomingReminders);
router.post("/", createPost);
router.get("/", getPosts);
router.patch("/:id", updatePost);
router.patch("/:id/move-date", moveDate);
router.patch("/:id/move-status", moveStatus);
router.delete("/:id", deletePost);

module.exports = router;
