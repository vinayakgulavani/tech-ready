const express = require('express');
const { requireSignIn, isAdmin } = require('../middlewares/authMiddlewares');
const {
     createLanguageController,
     getLanguageController,
     getSingleLanguageController,
     updateLanguageController,
     deleteLanguageController, 
    } = require('../controllers/languageController');

//router object 
const router = express.Router();

//add language
router.post('/add-language', requireSignIn, isAdmin, createLanguageController);

//get all languages
router.get('/get-language', getLanguageController);

//get languages
router.get('/get-single-language/:lang', getSingleLanguageController);


//update language
router.put('/update-language/:id', updateLanguageController);

//delete language
router.delete('/delete-language/:id', deleteLanguageController);


module.exports = router;