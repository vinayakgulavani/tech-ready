const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    courseName: {
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
    price: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

//courseSchema.index({ courseName: 1, topics: 1 }, { unique: true })

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;