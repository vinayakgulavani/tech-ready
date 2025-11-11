const courseMockTestModel = require('../models/courseMockTestModel');
const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();

//get mock test number
const getMocktestNumber = async (req, res) => {
    try {

        const courseName = req.params.course;

        // Get the next test number for the course
        const lastMockTest = await courseMockTestModel
            .findOne({ courseName: courseName })
            .sort({ testNumber: -1 })
            .select('testNumber');

        const testNumber = lastMockTest ? lastMockTest.testNumber + 1 : 1;

        const testName = `Mock Test ${testNumber}`;

        res.status(200).send({
            success: true,
            message: `Mock Test ${testNumber}`,
            testName
        });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send({
            success: false,
            message: "Error While Geting next mock test number",
            error: error.message,
        });
    }
}

//add  question
const createQuestionController = async (req, res) => {
    try {
        const courseName = req.params.course;
        const { questions } = req.body;

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(courseName)) {
            return res.status(400).send({ message: "Invalid Course ID" });
        }

        // Get the next test number for the course
        const lastMockTest = await courseMockTestModel
            .findOne({ courseName: courseName })
            .sort({ testNumber: -1 })
            .select('testNumber');

        console.log("Last Test Number:", lastMockTest?.testNumber);
        const testNumber = lastMockTest ? lastMockTest.testNumber + 1 : 1;

        const testName = `Mock Test ${testNumber}`;
        console.log("Test Number:", testNumber);
        console.log("Test Name:", testName);

        // Save the mock test

        const newMockTest = await new courseMockTestModel({
            courseName,
            testNumber,
            testName,
            questions
        }).save();

        res.status(200).send({
            success: true,
            message: `Mock Test ${testNumber} created successfully`,
            mockTest: newMockTest
        });

    } catch (err) {
        console.log("Error:", err);
        if (err.code === 11000) {
            res.status(400).send({
                success: false,
                message: "Mock test number or question already exists",
                err,
            });
        } else {
            res.status(500).send({
                success: false,
                message: "Error while creating question",
                err,
            });
        }
    }
};

//get all questions
const getQuestionController = async (req, res) => {
    try {
        const questions = await courseMockTestModel.find({});
        res.status(200).send({
            success: true,
            message: "All questions",
            questions
        });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send({
            success: false,
            message: "Error While Geting questions",
            error: error.message,
        });
    }
}

//get single course all questions
const getCourseQuestionController = async (req, res) => {
    try {
        const { course } = req.params;
        const questions = await courseMockTestModel.find({ courseName: course });

        if (!questions) {
            return res.status(404).send({
                success: false,
                message: "Question not found",
            });
        }
        res.status(200).send({
            success: true,
            message: "All questions",
            questions
        });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send({
            success: false,
            message: "Error While Geting questions",
            error: error.message,
        });
    }
}

//get single question
const getSingleQuestionController = async (req, res) => {
    try {
        const mocktest = await courseMockTestModel.findOne({ _id: req.params.mocktest });

        if (!mocktest) {
            return res.status(404).send({
                success: false,
                message: "Mock test not found",
            });
        }

        res.status(200).send({
            success: true,
            message: "Single Mock Test retrieved successfully",
            mocktest,
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: "Error in getting single question",
            error: err.message,
        });
    }
};

//update  question
const updateQuestionController = async (req, res) => {
    try {
        const courseName = req.params.course;
        const mocktest = req.params.mocktest;
        const { questions, testName,testNumber } = req.body;

        const mocktestfind = await courseMockTestModel.findOne({ _id: req.params.mocktest });

        if (!mocktestfind) {
            return res.status(404).send({
                success: false,
                message: "Mock test not found",
            });
        }

        // Validate ObjectId
        // if (!mongoose.Types.ObjectId.isValid(req.params.que)) {
        //     return res.status(400).send({ message: "Invalid mock test ID" });
        // }

        // Update question
        const updatequestion = await courseMockTestModel.findByIdAndUpdate(
            mocktest,
            {
                courseName,
                testNumber,
                testName,
                questions
            },
            { new: true } // Return the updated document
        );

        if (!updatequestion) {
            return res.status(404).send({
                success: false,
                message: "Mock test not found",
            });
        }

        res.status(200).send({
            success: true,
            message: "Mock Test Updated Successfully",
            updatequestion,
        });
    } catch (err) {
        console.log(err);
        if (err.code === 11000) {
            res.status(400).send({
                success: false,
                message: "Mock Test already exists",
                err,
            });
        } else {
            res.status(500).send({
                success: false,
                message: "Error while updating Mock Test",
                err,
            });
        }
    }
};

//delete  question
const deleteQuestionController = async (req, res) => {
    try {
        await courseMockTestModel.findByIdAndDelete(req.params.mocktest);
        res.status(200).send({
            success: true,
            message: "Question deleted successfully"
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: "Erorr while deleting question",
            error: err.message,
        });
    }
}

module.exports = {
    getMocktestNumber,
    createQuestionController,
    getQuestionController,
    getCourseQuestionController,
    getSingleQuestionController,
    updateQuestionController,
    deleteQuestionController,
};