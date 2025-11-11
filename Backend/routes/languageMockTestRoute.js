const express = require('express');
const { requireSignIn, isAdmin } = require('../middlewares/authMiddlewares');
const { 
    getMocktestNumber,
    createQuestionController,
    getQuestionController,
    getLanguageQuestionController,
    getSingleQuestionController,
    updateQuestionController,
    deleteQuestionController,

 } = require('../controllers/languageMockTestController');

//router object 
const router = express.Router();

//get mock test number
router.get('/get-mocktest-number/:lang', getMocktestNumber);

//add  mocktest
router.post('/add-mocktest/:lang', requireSignIn, isAdmin, createQuestionController);

//get all mock test
router.get('/get-mocktest', getQuestionController);

//get single lang all mocktest
router.get('/get-mocktest/:lang', getLanguageQuestionController);

//get single mocktest
router.get('/get-single-mocktest/:mocktest', getSingleQuestionController);

//update mocktest
router.put('/update-mocktest/:lang/:mocktest', updateQuestionController);

//delete mocktest
router.delete('/delete-mocktest/:mocktest', deleteQuestionController);

module.exports = router;