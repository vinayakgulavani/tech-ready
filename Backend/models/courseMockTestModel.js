const mongoose = require('mongoose');

// Define the schema
const courseMockQuestionsSchema = new mongoose.Schema({
        courseName: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "courses",
            required: true,
        },
        testNumber: {
            type: Number,
            required: true,
        },
        testName: {
            type: String,
            required: true,
        },
        questions: [
            {
                question: {
                    type: String,
                    required: true,
                },
                options: {
                    type: [String],
                    required: true,
                    validate: {
                        validator: (v) => v.length === 4,
                        message: "There must be exactly 4 options",
                    },
                },
                answer: {
                    type: String,
                    required: true,
                },
                difficulty: {
                    type: String,
                    enum: ["Easy", "Medium", "Hard"],
                    default: "Medium",
                },
            },
        ],
    },
    { timestamps: true }
);

// Compound index to make testNumber unique within the same course
courseMockQuestionsSchema.index({ courseName: 1, testNumber: 1 }, { unique: true });
courseMockQuestionsSchema.index({ questions: 1, testNumber: 1 }, { unique: true });

// Create the model using the schema
const courseMockQuestions = mongoose.model("courseMockQuestions", courseMockQuestionsSchema);

module.exports = courseMockQuestions;

