const courseModel = require('../models/courseModel');

const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();


//add  courses
const createCourseController = async (req, res) => {
    try {
        const { courseName, description, difficulty, topics ,price} = req.body;
        //validations
        if (!courseName) {
            return res.send({ message: "Course name is Required" });
        }
        if (!description) {
            return res.send({ message: "Description is Required" });
        }
        if (!topics) {
            return res.send({ message: "Topics is Required" });
        }

        //save
        const user = await new courseModel({
            courseName,
            description,
            difficulty,
            topics,
            price
        }).save();

        res.status(201).send({
            success: true,
            message: "Create course Successfully",
            user,
        });
    }
    catch (err) {
        console.log(err);
        console.log(err.message);

        if (err.code === 11000) {
            res.status(500).send({
                success: false,
                message: 'Already Course exist',
                err
            })
        }
        else {
            res.status(500).send({
                success: false,
                message: 'Error in Create course',
                err
            })
        }
    }
}


//get courses
const getCourseController = async (req, res) => {
    try {
        const courses = await courseModel.find({});
        res.status(200).send({
            success: true,
            message: "All courses",
            courses
        });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send({
            success: false,
            message: "Error While Geting courses",
            error: error.message,
        });
    }
}

//get single course
const getSingleCourseController = async (req, res) => {
    try {
        const course = await courseModel.findById(req.params.course);

        if (!course) {
            return res.status(404).send({
                success: false,
                message: "Course not found",
            });
        }

        res.status(200).send({
            success: true,
            message: "Single course retrieved successfully",
            course,
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: "Error in getting single course",
            error: err.message,
        });
    }
};



const updateCourseController = async (req, res) => {
    try {
        const { courseName, description, difficulty, topics,price } = req.body;

        // Update the course and return the updated document
        const updatedCourse = await courseModel.findByIdAndUpdate(
            req.params.course,
            {
                courseName,
                description,
                difficulty,
                topics,
                price
            },
            { new: true } // This option ensures the updated document is returned
        );

        if (!updatedCourse) {
            return res.status(404).send({
                success: false,
                message: "Course not found",
            });
        }

        res.status(200).send({
            success: true,
            message: "Course Updated Successfully",
            updatedCourse,
        });
    } catch (err) {
        console.log(err);
        if (err.code === 11000) {
            res.status(400).send({
                success: false,
                message: "Course already exists",
                err,
            });
        } else {
            res.status(500).send({
                success: false,
                message: "Error while updating course",
                err,
            });
        }
    }
};


const deleteCourseController = async (req, res) => {
    try {
        await courseModel.findByIdAndDelete(req.params.course);
        res.status(200).send({
            success: true,
            message: "Course deleted successfully"
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: "Erorr while deleting course",
            error: err.message,
        });
    }
}

module.exports = {
    createCourseController,
    getCourseController,
    getSingleCourseController,
    updateCourseController,
    deleteCourseController,
};