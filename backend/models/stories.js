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
        type: Date,
        required: false,
        default: Date.now
    },
    StoryContent: {
        type: String,
        required: true
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
})


module.exports = mongoose.model('Stories', storySchema)