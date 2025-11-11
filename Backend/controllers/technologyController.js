const technologyModel = require('../models/technologyModel');

const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();


//add technology
const createTechnologyController = async (req, res) => {
    try {
        const { technologyName, description, difficulty, topics } = req.body;
        //validations
        if (!technologyName) {
            return res.send({ message: "technology name is Required" });
        }
        if (!description) {
            return res.send({ message: "Description is Required" });
        }
        if (!topics) {
            return res.send({ message: "Topics is Required" });
        }

        //save
        const user = await new technologyModel({
            technologyName,
            description,
            difficulty,
            topics
        }).save();

        res.status(201).send({
            success: true,
            message: "Create technology Successfully",
            user,
        });
    }
    catch (err) {
        console.log(err);
        console.log(err.message);

        if (err.code === 11000) {
            res.status(500).send({
                success: false,
                message: 'Already technology exist',
                err
            })
        }
        else {
            res.status(500).send({
                success: false,
                message: 'Error in Create technology',
                err
            })
        }
    }
}


//get technology
const getTechnologyController = async (req, res) => {
    try {
        const technology = await technologyModel.find({});
        res.status(200).send({
            success: true,
            message: "All technology",
            technology
        });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send({
            success: false,
            message: "Error While Geting technology",
            error: error.message,
        });
    }
}

//get single technology
const getSingleTechnologyController = async (req, res) => {
    try {
        const technology = await technologyModel.findById(req.params.id);

        if (!technology) {
            return res.status(404).send({
                success: false,
                message: "technology not found",
            });
        }

        res.status(200).send({
            success: true,
            message: "Single technology retrieved successfully",
            technology,
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: "Error in getting single technology",
            error: err.message,
        });
    }
};

//update
const updateTechnologyController = async (req, res) => {
    try {
        const { technologyName, description, difficulty, topics } = req.body;

        // Update technology
        const updatetechnology = await technologyModel.findByIdAndUpdate(
            req.params.id,
            {
                technologyName,
                description,
                difficulty,
                topics
            },
            { new: true } // अपडेट झालेले डेटा परत मिळवण्यासाठी
        );

        if (!updatetechnology) {
            return res.status(404).send({
                success: false,
                message: "Technology not found",
            });
        }

        res.status(200).send({
            success: true,
            message: "Technology updated successfully",
            updatetechnology,
        });
    } catch (err) {
        console.log(err);
        if (err.code === 11000) {
            res.status(400).send({
                success: false,
                message: "Technology already exists",
                err,
            });
        } else {
            res.status(500).send({
                success: false,
                message: "Error while updating technology",
                err,
            });
        }
    }
};


const deleteTechnologyController = async (req, res) => {
    try {
        await technologyModel.findByIdAndDelete(req.params.id);
        res.status(200).send({
            success: true,
            message: "technology deleted successfully"
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: "Erorr while deleting technology",
            error: err.message,
        });
    }
}

module.exports = {
    createTechnologyController,
    getTechnologyController,
    getSingleTechnologyController,
    updateTechnologyController,
    deleteTechnologyController,
};