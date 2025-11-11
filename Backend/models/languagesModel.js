const mongoose = require('mongoose');

// Define the schema
const languageSchema = new mongoose.Schema({
    languageName: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        default: "No Description available"
    },
    createAt: {
        type: Date,
        default: Date.now,
    }

});

const languages = mongoose.model("languages", languageSchema);

module.exports = languages;