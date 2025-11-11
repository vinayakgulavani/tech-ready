const express = require('express');
const fs = require('fs');
const path = require('path');
const { requireSignIn, isAdmin } = require('../middlewares/authMiddlewares');
const {
    createLanguageNotesController,
    getLanguageNotesController,
    
    deleteLanguageNotesController,
    updateLanguageNotesController,
    getSingleNotesController,
    getSingleLanguageNotesController,
} = require('../controllers/languageNotesController');
const upload = require('../middlewares/uploadImage');

// Router object
const router = express.Router();

// Add notes with image upload
router.post(
    '/add-languageNotes/:lang',
    requireSignIn,
    isAdmin,
    upload.fields([
        { name: 'mainImage', maxCount: 1 },
        { name: 'subImages', maxCount: 10 }
    ]),
    createLanguageNotesController
);

// Get all notes
router.get('/get-languageNotes', getLanguageNotesController);

// Get single language notes
router.get('/get-languageNotes/:lang', getSingleLanguageNotesController);

// Get single note
router.get('/get-single-notes/:notes', getSingleNotesController);

// Update notes (including image update)
router.put(
    '/update-languageNotes/:lang/:notes',
    requireSignIn,
    isAdmin,
    upload.fields([
        { name: 'mainImage', maxCount: 1 },
        { name: 'subImages', maxCount: 10 }
    ]),
    updateLanguageNotesController
);

// Delete notes
router.delete('/delete-languageNotes/:notes', requireSignIn, isAdmin, deleteLanguageNotesController);

// Serve main image
router.get('/get-image/:imageName', (req, res) => {
    const imagePath = path.join(__dirname, '../upload', req.params.imageName);
    if (fs.existsSync(imagePath)) {
        res.sendFile(imagePath);
    } else {
        res.status(404).json({ message: 'Image not found' });
    }
});

// Serve sub-image
router.get('/get-subimage/:imageName', (req, res) => {
    const imagePath = path.join(__dirname, '../upload', req.params.imageName);
    if (fs.existsSync(imagePath)) {
        res.sendFile(imagePath);
    } else {
        res.status(404).json({ message: 'Subimage not found' });
    }
});

module.exports = router;
