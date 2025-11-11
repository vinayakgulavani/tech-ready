const mongoose = require("mongoose");

const courseNotesSchema = new mongoose.Schema(
  {
    courseName: {
      type: mongoose.ObjectId,
      ref: "courses",
      required: true,
    },
    notestitle: {
      type: String,
      required: true,
      unique: true,
    },
    subtitle: {
      type: [String],
    },
    description: {
      type: [String],
    },
    mainImage: {
      type: String,
    },
    subImages: [
      {
        imageUrl: { type: String },
      },
    ],
    createAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const courseNotes = mongoose.model("courseNotes", courseNotesSchema);
module.exports = courseNotes;
