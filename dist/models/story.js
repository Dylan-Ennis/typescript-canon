"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const commentSchema = new mongoose_1.Schema({
    content: { type: String, required: true },
    author: { type: String, required: true },
});
const storySchema = new mongoose_1.Schema({
    Title: { type: String, required: true },
    StoryContent: { type: String, required: true },
    Author: { type: String, required: true },
    comments: [commentSchema],
});
const Story = (0, mongoose_1.model)('Story', storySchema);
exports.default = Story;
