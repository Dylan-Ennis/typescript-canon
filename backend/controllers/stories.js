const router = require('express').Router();
const Stories = require("../models/stories");

// router.use(express.json())

// GET
router.get('/', async (req, res) => {
    try {
        const stories = await Stories.find();
        res.json(stories);
    } catch (error) {
        console.error('Error fetching stories:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// POST request to create a new story
router.post("/", async (req, res) => {
    try {
        const newStory = await Stories.create(req.body); // Create a new story
        res.status(201).json(newStory); // Respond with the created story in JSON format
    } catch (error) {
        console.log("Error creating story:", error);
        res.status(500).json({ message: "Error creating story" });
    }
});

module.exports = router