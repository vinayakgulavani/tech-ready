const mongoose = require('mongoose');

const purchaseCourseModelSchema = new mongoose.Schema({
    courseName: {
        type: mongoose.ObjectId,
        ref: "courses",
        required: true,
    },
    name: {
        type: mongoose.ObjectId,
        ref: "users",
        required: true,
    },
    purchaseDate: {
        type: Date,
        default: Date.now
    },
    // transactionId: { type: String, unique: true, required: true }
});

const purchaseCourseModel = mongoose.model("purchaseCourse", purchaseCourseModelSchema);
module.exports = purchaseCourseModel;