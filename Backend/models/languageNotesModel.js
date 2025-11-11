const mongoose = require("mongoose");

const languageNotesSchema = new mongoose.Schema(
  {
    languageName: {
      type: mongoose.ObjectId,
      ref: "languages",
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

const languageNotes = mongoose.model("languageNotes", languageNotesSchema);
module.exports = languageNotes;
