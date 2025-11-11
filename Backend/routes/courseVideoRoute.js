const express = require('express');
const fs = require('fs');
const path = require('path');
const { requireSignIn, isAdmin } = require('../middlewares/authMiddlewares');

const uploadVideos = require('../middlewares/uploadCourseVideo');
const { 
    createCourseVideoController,
    getCourseVideoController,
    getSingleCourseVideoController,
    updateCourseVideoController,
    deleteCourseVideoController,
    getSingleVideoController,
 } = require('../controllers/courseVideoController');

// Router object
const router = express.Router();

// Add video 
router.post(
    '/add-courseVideo/:course',
    requireSignIn,
    isAdmin,
    uploadVideos.fields([
        { name: 'videoUrl', maxCount: 1 },
    ]),
    createCourseVideoController
);

// Get all course all videos
router.get('/get-courseVideo', getCourseVideoController);

// Get single one couse all video
router.get('/get-single-courseVideo/:course', getSingleCourseVideoController);

// Get single notes
router.get('/get-single-video/:video', getSingleVideoController);

// Update video 
router.put(
    '/update-single-video/:video',
    requireSignIn,
    isAdmin,
    uploadVideos.fields([
        { name: 'videoUrl', maxCount: 1 },
    ]),
    updateCourseVideoController
);

// Delete video
router.delete('/delete-courseVideo/:video', requireSignIn, isAdmin, deleteCourseVideoController);

// Serve main video
router.get('/get-video/:videoName', (req, res) => {
    const imagePath = path.join(__dirname, '../uploadVideos', req.params.videoName);
    if (fs.existsSync(videoPath)) {
        res.sendFile(videoPath);
    } else {
        res.status(404).json({ message: 'Video not found' });
    }
});


module.exports = router;
