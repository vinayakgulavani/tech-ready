const express = require('express');
const { purchaseCourseController, checkAccessCourseController } = require('../controllers/coursePurchaseController');
const { requireSignIn, isAdmin } = require('../middlewares/authMiddlewares');


const router = express.Router();


router.post('/purchase-course/:course/:name',requireSignIn, purchaseCourseController);

 
router.get('/check-access/:course/:name',requireSignIn, checkAccessCourseController);


module.exports = router;
