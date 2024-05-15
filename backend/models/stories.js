const mongoose = require('mongoose')
require("dotenv").config();

const storySchema = new mongoose.Schema({
    Title: {
        type: String,
        required: true
    },
    Author: {
        type: String,
        required: true
    },
    DateCreated: {
        type: String,
        required: false
    },
    StoryContent: {
        type: String,
        required: true
    }
})


module.exports = mongoose.model('Stories', storySchema)