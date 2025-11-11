const purchaseCourseModel = require('../models/purchaseCourseModel');

const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();


//add  courses
const purchaseCourseController = async (req, res) => {
    try {
        const courseName = req.params.course;
        const name = req.params.name;

        // Save purchase details in database
        const coursePurchase = await new purchaseCourseModel({
            courseName,
            name,
        }).save();

        res.status(201).send({
            success: true,
            message: "Purchase course Successfully",
            coursePurchase,
        });

        if (!coursePurchase) {
            return res.status(404).send({
                success: false,
                message: "User not found",
            });
        }

    }
    catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: 'Error in purchase course',
            err
        })
    }
}


//get courses
const checkAccessCourseController = async (req, res) => {
    try {
        const courseName = req.params.course;
        const name = req.params.name;

        const purchase = await purchaseCourseModel.findOne({ courseName, name });

        if (!purchase) {
            return res.status(200).send({
                success: false,
                message: "Access check not valid",
            });
        }

        res.status(201).send({
            success: true,
            message: "Access check valid",
            purchase,
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


module.exports = {
    purchaseCourseController,
    checkAccessCourseController
};