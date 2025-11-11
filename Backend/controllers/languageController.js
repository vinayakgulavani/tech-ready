const languagesModel = require('../models/languagesModel');

const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();


// add language
const createLanguageController = async (req, res) => {
    try {
        const { languageName, description } = req.body;
        //validations
        if (!languageName) {
            return res.send({ message: "language is Required" });
        }

        //check user
        const exisitingLanguage = await languagesModel.findOne({ languageName });

        //exisiting Question
        if (exisitingLanguage) {
            return res.status(200).send({
                success: false,
                message: "Already language exits",
            });
        }

        //save
        const language = await new languagesModel({
            languageName,
            description
        }).save();

        res.status(201).send({
            success: true,
            message: "Language create successfully",
            language,
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: 'Error in create language',
            err
        })
    }
}


//get all languages
const getLanguageController = async (req, res) => {
    try {
        const language = await languagesModel.find({});
        res.status(200).send({
            success: true,
            message: "All Languages",
            language
        });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send({
            success: false,
            message: "Error While Geting Languages",
            error: error.message,
        });
    }
};

//get single language
// Find language by ID - Corrected
const getSingleLanguageController = async (req, res) => {
    try {
        const language = await languagesModel.findById(req.params.lang);  // ✅ Corrected

        if (!language) {
            return res.status(404).send({
                success: false,
                message: "Language not found",
            });
        }

        res.status(200).send({
            success: true,
            message: "Single language",
            language,
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: "Error in getting single language",
            error: err.message,
        });
    }
}

// update language
const updateLanguageController = async (req, res) => {
    try {
        const { languageName, description } = req.body;
        // Validations
        if (!languageName) {
            return res.status(400).send({ message: "Language name is required" });
        }

        // Update language
        const language = await languagesModel.findByIdAndUpdate(
            req.params.id,
            { languageName, description },
            { new: true }
        );

        if (!language) {
            return res.status(404).send({
                success: false,
                message: "Language not found",
            });
        }

        res.status(200).send({
            success: true,
            message: "Language updated successfully",
            language,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error: error.message,
            message: "Error in updating language",
        });
    }
};


//delete language 


const deleteLanguageController = async (req, res) => {
    try {
        await languagesModel.findByIdAndDelete(req.params.id);
        res.status(200).send({
            success: true,
            message: "Language deleted successfully"
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: "Erorr while deleting language",
            error: err.message,
        });
    }
}



module.exports = {
    createLanguageController,
    getLanguageController,
    getSingleLanguageController,
    updateLanguageController,
    deleteLanguageController,
};