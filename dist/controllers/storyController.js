"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStory = exports.addComment = exports.getStory = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const story_1 = __importDefault(require("../models/story"));
const getStory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const story = yield story_1.default.findById(req.params.id).populate('comments');
        if (!story) {
            return res.status(404).send('Story not found');
        }
        res.send(story);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.getStory = getStory;
const addComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const story = yield story_1.default.findById(req.params.storyId);
        if (!story) {
            return res.status(404).send('Story not found');
        }
        const newComment = {
            content: req.body.content,
            author: req.body.author,
            _id: new mongoose_1.default.Types.ObjectId().toString(), // Ensure a new _id is created
        };
        story.comments.push(newComment);
        yield story.save();
        res.send(story);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.addComment = addComment;
const createStory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newStory = new story_1.default({
            Title: req.body.Title,
            StoryContent: req.body.StoryContent,
            Author: req.body.Author,
        });
        const savedStory = yield newStory.save();
        res.send(savedStory);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.createStory = createStory;
