const express = require('express');
const {
    getCourseController,
    createCourseController,
    updateCourseController,
    deleteCourseController,
    getSingleCourseController,

} = require('../controllers/coursesController');
const { requireSignIn, isAdmin } = require('../middlewares/authMiddlewares');


//router object 
const router = express.Router();

//add course 
router.post('/add-course',requireSignIn, isAdmin, createCourseController);

//get all courses
router.get('/get-courses', getCourseController);

//get course 
router.get('/get-single-course/:course', getSingleCourseController);

//update course 
router.put('/update-course/:course', updateCourseController);

//delete course 
router.delete('/delete-course/:course', deleteCourseController);

module.exports = router;