const express = require('express');
const { 
    createTechnologyController,
    getTechnologyController,
    getSingleTechnologyController,
    updateTechnologyController,
    deleteTechnologyController,

 } = require('../controllers/technologyController');

const { requireSignIn, isAdmin } = require('../middlewares/authMiddlewares');


//router object 
const router = express.Router();

//add technology 
router.post('/add-technology',requireSignIn, isAdmin, createTechnologyController);

//get all technology
router.get('/get-technology', getTechnologyController);

//get technology 
router.get('/get-single-technology/:id', getSingleTechnologyController);

//update technology 
router.put('/update-technology/:id', updateTechnologyController);

//delete technology 
router.delete('/delete-technology/:id', deleteTechnologyController);

module.exports = router;