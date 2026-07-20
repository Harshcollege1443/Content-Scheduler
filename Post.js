const mongoose = require("mongoose");

const STATUSES = ["idea", "shooting", "editing", "posted"];
const PLATFORMS = ["youtube", "instagram", "x"];

const postSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, trim: true },
    platform: { type: String, enum: PLATFORMS, required: true },
    status: { type: String, enum: STATUSES, default: "idea" },
    scheduledDate: { type: Date, required: true },
    reminderAt: { type: Date },
    notes: { type: String, trim: true, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
module.exports.STATUSES = STATUSES;
module.exports.PLATFORMS = PLATFORMS;
