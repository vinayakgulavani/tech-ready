const mongoose = require("mongoose");

const courseVideoSchema = new mongoose.Schema({
    courseName: {
        type: mongoose.ObjectId,
        ref: "courses",
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    topics: {
        type: [String],
    },
    videoUrl: {
        type: String,
        required: true,
    },
    views:{
        type:Number,
        default:0,
    },
    likes:{
        type:Number,
        default:0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const courseVideos = mongoose.model("courseVideos", courseVideoSchema);

module.exports = courseVideos;