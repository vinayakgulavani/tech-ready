const express = require('express');
const { requireSignIn, isAdmin } = require('../middlewares/authMiddlewares');
const { 
    createQuestionController,
    getQuestionController,
    getSingleQuestionController,
    updateQuestionController,
    deleteQuestionController,
    getCourseQuestionController,
    getMocktestNumber,

 } = require('../controllers/courseMockTestController');


//router object 
const router = express.Router();

//get mock test number
router.get('/get-mocktest-number/:course', getMocktestNumber);


//add  questions
router.post('/add-mocktest/:course', requireSignIn, isAdmin, createQuestionController);

//get all questions
router.get('/get-mocktest', getQuestionController);

//get single course all questions
router.get('/get-mocktest/:course', getCourseQuestionController);

//get single question
router.get('/get-single-mocktest/:mocktest', getSingleQuestionController);

//update questions
router.put('/update-mocktest/:course/:mocktest', updateQuestionController);

//delete questions
router.delete('/delete-mocktest/:mocktest', deleteQuestionController);

module.exports = router;