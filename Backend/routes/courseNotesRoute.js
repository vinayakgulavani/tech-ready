const express = require('express');
const fs = require('fs');
const path = require('path');
const { requireSignIn, isAdmin } = require('../middlewares/authMiddlewares');

const uploads = require('../middlewares/uploadCourseImage');
const { 
    createCourseNotesController,
    getCourseNotesController,
    getSingleCourseNotesController,
    deleteCourseNotesController,
    updateCourseNotesController,
    getSingleNotesController,
 } = require('../controllers/courseNotesController');

// Router object
const router = express.Router();

// Add notes with image uploads
router.post(
    '/add-courseNotes/:course',
    requireSignIn,
    isAdmin,
    uploads.fields([
        { name: 'mainImage', maxCount: 1 },
        { name: 'subImages', maxCount: 10 }
    ]),
    createCourseNotesController
);

// Get all course all notes
router.get('/get-courseNotes', getCourseNotesController);

// Get  one couse all notes
router.get('/get-single-courseNotes/:course', getSingleCourseNotesController);


// Get single notes
router.get('/get-single-notes/:notes', getSingleNotesController);


// Update notes (including image update)
router.put(
    '/update-single-notes/:notes',
    requireSignIn,
    isAdmin,
    uploads.fields([
        { name: 'mainImage', maxCount: 1 },
        { name: 'subImages', maxCount: 10 }
    ]),
    updateCourseNotesController
);

// Delete notes
router.delete('/delete-single-notes/:notes', requireSignIn, isAdmin, deleteCourseNotesController);

// Serve main image
router.get('/get-image/:imageName', (req, res) => {
    const imagePath = path.join(__dirname, '../uploads', req.params.imageName);
    if (fs.existsSync(imagePath)) {
        res.sendFile(imagePath);
    } else {
        res.status(404).json({ message: 'Image not found' });
    }
});

// Serve sub-image
router.get('/get-subimage/:imageName', (req, res) => {
    const imagePath = path.join(__dirname, '../uploads', req.params.imageName);
    if (fs.existsSync(imagePath)) {
        res.sendFile(imagePath);
    } else {
        res.status(404).json({ message: 'Subimage not found' });
    }
});

module.exports = router;
