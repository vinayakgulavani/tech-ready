const languageNotesModel = require('../models/languageNotesModel');
const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();

// Create Language Notes
const createLanguageNotesController = async (req, res) => {
    try {
        const languageName = req.params.lang;
        const {notestitle, subtitle, description, } = req.body;

        // Validations
        if (!languageName) return res.status(400).send({ message: "Language Name is Required" });
        if (!notestitle) return res.status(400).send({ message: "Notes Title is Required" });

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(languageName)) {
            return res.status(400).send({ message: "Invalid Language ID" });
        }

        // Main Image Upload
        let mainImageUrl = "";
        if (req.files && req.files.mainImage) {
            mainImageUrl = `upload/${req.files.mainImage[0].filename}`;
        }

        // Sub Images Upload
        let subImagesArray = [];
        if (req.files && req.files.subImages) {
            subImagesArray = req.files.subImages.map(file => ({
                imageUrl: `upload/${file.filename}`,
            }));
        }


        // Save Notes
        const newNotes = await new languageNotesModel({
            languageName,
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
const getLanguageNotesController = async (req, res) => {
    try {
        const notes = await languageNotesModel.find({});
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

//single lang notes
const getSingleLanguageNotesController = async (req, res) => {
    try {
        const { lang } = req.params;
        const notes = await languageNotesModel.find({ languageName: lang });

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

//single lang all note
const getSingleNotesController = async (req, res) => {
    try {
        const { notes } = req.params;
        const note = await languageNotesModel.findOne({ _id: notes });

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


// Delete Language Note
const deleteLanguageNotesController = async (req, res) => {
    try {
        await languageNotesModel.findByIdAndDelete(req.params.notes);
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

// Update Language Notes
const updateLanguageNotesController = async (req, res) => {
    try {
        const languageName = req.params.lang;
        const {  notestitle, subtitle, description, difficulty } = req.body;

        // Validations
        if (!notestitle) return res.send({ message: "Notes Title is Required" });

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(languageName)) {
            return res.status(400).send({ message: "Invalid Language ID" });
        }

        // Find existing note
        const existingNote = await languageNotesModel.findById(req.params.notes);
        if (!existingNote) {
            return res.status(404).send({ message: "Note not found" });
        }

        // Main Image Upload
        let mainImageUrl = "";
        if (req.files && req.files.mainImage) {
            mainImageUrl = `upload/${req.files.mainImage[0].filename}`;
        }

        // Sub Images Upload
        let subImagesArray = [];
        if (req.files && req.files.subImages) {
            subImagesArray = req.files.subImages.map(file => ({
                imageUrl: `upload/${file.filename}`,
            }));
        }

        // Update Notes
        const updateNotes = await languageNotesModel.findByIdAndUpdate(
            req.params.notes,
            {
                languageName,
                notestitle,
                subtitle,
                description,
                difficulty,
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
    createLanguageNotesController,
    getLanguageNotesController,
    getSingleNotesController,
    getSingleLanguageNotesController,
    deleteLanguageNotesController,
    updateLanguageNotesController,
};
