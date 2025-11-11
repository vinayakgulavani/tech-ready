const courseNotesModel = require('../models/courseNotesModel');
const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();

// Create Course Notes
const createCourseNotesController = async (req, res) => {
    try {
        const courseName = req.params.course;
        const { notestitle, subtitle, description } = req.body;

        // Validations
        if (!notestitle) return res.status(400).send({ message: "Notes Title is Required" });

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(courseName)) {
            return res.status(400).send({ message: "Invalid Course ID" });
        }


        // Main Image Upload
        let mainImageUrl = "";
        if (req.files && req.files.mainImage) {
            mainImageUrl = `uploads/${req.files.mainImage[0].filename}`;
        }

        // Sub Images Upload
        let subImagesArray = [];
        if (req.files && req.files.subImages) {
            subImagesArray = req.files.subImages.map(file => ({
                imageUrl: `uploads/${file.filename}`,
            }));
        }

        // Save Notes
        const newNotes = await new courseNotesModel({
            courseName,
            notestitle,
            subtitle,
            description,
            mainImage: mainImageUrl,
            subImages: subImagesArray,
        }).save();

        res.status(200).send({
            success: true,
            message: "Notes Created Successfully",
            newNotes,
        });
    } catch (err) {
        console.log(err);
        if (err.code === 11000) {
            res.status(400).send({
                success: false,
                message: "Notes already exist",
                error: err.message,
            });
        } else {
            res.status(500).send({
                success: false,
                message: "Error while creating notes",
                error: err.message,
            });
        }
    }
};

// Get All Notes
const getCourseNotesController = async (req, res) => {
    try {
        const notes = await courseNotesModel.find({});
        res.status(200).send({
            success: true,
            message: "All notes",
            notes,
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

// Get single course all notes
const getSingleCourseNotesController = async (req, res) => {
    try {
        const { course } = req.params;
        const notes = await courseNotesModel.find({ courseName: course });

        if (!notes) {
            return res.status(404).send({
                success: false,
                message: "Notes not found",
            });
        }

        res.status(200).send({
            success: true,
            message: "Single notes fetched successfully",
            notes,
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

// Get single  course all notes
const getSingleNotesController = async (req, res) => {
    try {
        const { notes } = req.params;
        const note = await courseNotesModel.findOne({ _id: notes });

        // **************
        if (!note) {
            return res.status(404).send({
                success: false,
                message: "Notes not found",
            });
        }

        res.status(200).send({
            success: true,
            message: "Single notes fetched successfully",
            note,
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
const deleteCourseNotesController = async (req, res) => {
    try {
        const { notes } = req.params;
        const note = await courseNotesModel.findOne({ _id: notes });

        // **************
        if (!note) {
            return res.status(404).send({
                success: false,
                message: "Notes not found",
            });
        }

        await courseNotesModel.findByIdAndDelete(notes);
        res.status(200).send({
            success: true,
            message: "Notes deleted successfully",
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: "Error while deleting notes",
            error: err.message,
        });
    }
};

// Update Course Notes
const updateCourseNotesController = async (req, res) => {
    try {
        const { courseName, notestitle, subtitle, description } = req.body;
        const { notes } = req.params;

        // Validations
        if (!courseName) return res.send({ message: "Course Name is Required" });
        if (!notestitle) return res.send({ message: "Notes Title is Required" });

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(courseName)) {
            return res.status(400).send({ message: "Invalid Course ID" });
        }

        // Find existing note
        const existingNote = await courseNotesModel.findOne({ _id: notes });
        if (!existingNote) {
            return res.status(404).send({ message: "Note not found" });
        }

        // Main Image Upload
        let mainImageUrl = "";
        if (req.files && req.files.mainImage) {
            mainImageUrl = `uploads/${req.files.mainImage[0].filename}`;
        }

        // Sub Images Upload
        let subImagesArray = [];
        if (req.files && req.files.subImages) {
            subImagesArray = req.files.subImages.map(file => ({
                imageUrl: `uploads/${file.filename}`,
            }));
        }


        // Update Notes
        const updateNotes = await courseNotesModel.findByIdAndUpdate(
            req.params.notes,
            {
                courseName,
                notestitle,
                subtitle,
                description,
                mainImage: mainImageUrl,
                subImages: subImagesArray,
            },
            { new: true }
        );


        res.status(200).send({
            success: true,
            message: "Notes updated successfully",
            updateNotes,
        });
    } catch (err) {
        console.log(err);
        if (err.code === 11000) {
            res.status(400).send({
                success: false,
                message: "Notes already exist",
                err,
            });
        } else {
            res.status(500).send({
                success: false,
                message: "Error while updating notes",
                err,
            });
        }
    }
};

module.exports = {
    createCourseNotesController,
    getCourseNotesController,
    getSingleCourseNotesController,
    getSingleNotesController,
    deleteCourseNotesController,
    updateCourseNotesController,
};
