"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const storyController_1 = require("../controllers/storyController");
const router = (0, express_1.Router)();
router.get('/:id', storyController_1.getStory);
router.post('/:storyId/comments', storyController_1.addComment);
router.post('/', storyController_1.createStory);
exports.default = router;
