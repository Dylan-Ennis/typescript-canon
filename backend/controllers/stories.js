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

// Get by id
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const story = await Stories.findById(id);
        if (!story) {
            return res.status(404).json({ message: 'Story not found' });
        }
        res.json(story);
    } catch (error) {
        console.error('Error finding story by ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Create
router.post("/", async (req, res) => {
    try {
        const newStory = await Stories.create(req.body); // Create a new story
        res.status(201).json(newStory); // Respond with the created story in JSON format
    } catch (error) {
        console.log("Error creating story:", error);
        res.status(500).json({ message: "Error creating story" });
    }
});


// Delete by id
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedStory = await Stories.findByIdAndDelete(id);
        if (!deletedStory) {
            return res.status(404).json({ message: 'Story not found' });
        }
        res.json({ message: 'Story deleted successfully', deletedStory });
    } catch (error) {
        console.error('Error deleting story:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// UPDATE by id
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, author, storyContent } = req.body;
    try {
        const updatedStory = await Stories.findByIdAndUpdate(id, {
            title,
            author,
            storyContent
        }, { new: true });
        if (!updatedStory) {
            return res.status(404).json({ message: 'Story not found' });
        }
        res.json({ message: 'Story updated successfully', updatedStory });
    } catch (error) {
        console.error('Error updating story:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router