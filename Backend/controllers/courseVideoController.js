const courseVideoModel = require('../models/courseVideoModel');
const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();

// Create Course Video
const createCourseVideoController = async (req, res) => {
    try {
        const courseName = req.params.course;
        const {  title, description ,topics} = req.body;

        // Validations
        if (!title) return res.status(400).send({ message: "Video Title is Required" });

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(courseName)) {
            return res.status(400).send({ message: "Invalid Course ID" });
        }

        // Main Video Upload
        let videoUrl = "";
        if (req.files && req.files.videoUrl) {
            videoUrl = `uploadVideos/${req.files.videoUrl[0].filename}`;
        }

        // if (!videoUrl) return res.status(400).send({ message: "Video is Required" });

        // Save Video
        const newVideo = await new courseVideoModel({
            courseName,
            title,
            description,
            topics,
            videoUrl: videoUrl,
        }).save();

        res.status(200).send({
            success: true,
            message: "Video Created Successfully",
            newVideo,
        });
    } catch (err) {
        console.log(err);
        if (err.code === 11000) {
            res.status(400).send({
                success: false,
                message: "Video already exist",
                error: err.message,
            });
        } else {
            res.status(500).send({
                success: false,
                message: "Error while creating Video",
                error: err.message,
            });
        }
    }
};


// Get All Video
const getCourseVideoController = async (req, res) => {
    try {
        const Video = await courseVideoModel.find({});
        res.status(200).send({
            success: true,
            message: "All Video",
            Video,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            success: false,
            message: "Error while getting Video",
            error: error.message,
        });
    }
};

const getSingleCourseVideoController = async (req, res) => {
    try {
        const { course } = req.params;
        const Video = await courseVideoModel.find({ courseName: course });

        if (!Video) {
            return res.status(404).send({
                success: false,
                message: "Video not found",
            });
        }

        res.status(200).send({
            success: true,
            message: "Single Video fetched successfully",
            Video,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            success: false,
            message: "Error while getting Video",
            error: error.message,
        });
    }
};


// Get single one couse all videp
const getSingleVideoController = async (req, res) => {
    try {
        const { video } = req.params;
        const Video = await courseVideoModel.findOne({ _id: video });

        // **************
        if (!Video) {
            return res.status(404).send({
                success: false,
                message: "video not found",
            });
        }

        res.status(200).send({
            success: true,
            message: "Single video fetched successfully",
            Video,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            success: false,
            message: "Error while getting notes",
            error: error.message,
        });
    }
};

// Delete Course Note
const deleteCourseVideoController = async (req, res) => {
    try {
        const { video } = req.params;
        const Video = await courseVideoModel.findOne({ _id: video });

        // **************
        if (!Video) {
            return res.status(404).send({
                success: false,
                message: "video not found",
            });
        }
        await courseVideoModel.findByIdAndDelete(req.params.video);
        res.status(200).send({
            success: true,
            message: "Video deleted successfully",
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: "Error while deleting Video",
            error: err.message,
        });
    }
};

// Update Course Video
const updateCourseVideoController = async (req, res) => {
    try {
        const { courseName, title, description ,topics} = req.body;
        const { video } = req.params;

        // Validations
        if (!courseName) return res.send({ message: "Course Name is Required" });
        if (!title) return res.send({ message: "Video Title is Required" });

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(courseName)) {
            return res.status(400).send({ message: "Invalid Course ID" });
        }

        // Find existing note
        const existingNote = await courseVideoModel.findOne({ _id: video });
        if (!existingNote) {
            return res.status(404).send({ message: "Video not found" });
        }

        // Main Video Upload
        let videoUrl = "";
        if (req.files && req.files.videoUrl) {
            videoUrl = `uploadVideos/${req.files.videoUrl[0].filename}`;
        }

        // if (!videoUrl) return res.status(400).send({ message: "Video is Required" });

        // Update Video
        const updateVideo = await courseVideoModel.findByIdAndUpdate(
            video,
            {
                courseName,
                title,
                description,
                topics,
                videoUrl: videoUrl,
            },
            { new: true }
        );

        res.status(200).send({
            success: true,
            message: "Video updated successfully",
            updateVideo,
        });
    } catch (err) {
        console.log(err);
        if (err.code === 11000) {
            res.status(400).send({
                success: false,
                message: "Video already exist",
                err,
            });
        } else {
            res.status(500).send({
                success: false,
                message: "Error while updating Video",
                err: err.message,
            });
        }
    }
};

module.exports = {
    createCourseVideoController,
    getCourseVideoController,
    getSingleCourseVideoController,
    getSingleVideoController,
    deleteCourseVideoController,
    updateCourseVideoController,
};
