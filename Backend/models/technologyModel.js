const mongoose = require("mongoose");

const technologySchema = new mongoose.Schema({
    technologyName: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    difficulty: {
        type: String,
        enum: ["Beginner", "Intermediate", "Advanced"],
        default: "Beginner",
    },
    topics: {
        type: [String],
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

technologySchema.index({ technologyName: 1, topics: 1 }, { unique: true })

const Technology = mongoose.model("Technology", technologySchema);

module.exports = Technology;