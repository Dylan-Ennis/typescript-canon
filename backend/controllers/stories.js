const router = require('express').Router();
const Stories = require("../models/stories");



// GET
router.get('/', async (req, res) => {
    try {
        const stories = await Stories.find().populate('comments');
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
        const story = await Stories.findById(id).populate('comments');
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
        const newStory = await Stories.create(req.body); 
        res.status(201).json(newStory); 
    } catch (error) {
        console.log("Error creating story:", error);
        res.status(500).json({ message: "Error creating story" });
    }
});

// Like a story
router.post('/:id/like', async (req, res) => {
    const { id } = req.params;

    try {
        const story = await Stories.findByIdAndUpdate(id, { $inc: { likes: 1 } }, { new: true });
        if (!story) {
            return res.status(404).json({ message: 'Story not found' });
        }
        res.json({ message: 'Story liked successfully', story });
    } catch (error) {
        console.error('Error liking story:', error);
        res.status(500).json({ message: 'Internal server error' });
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