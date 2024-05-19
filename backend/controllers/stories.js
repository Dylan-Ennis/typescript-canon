const express = require('express');
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



const seedDB = async () => {
    const seedStories = [
        {
            Title: 'The Quest for Ramen and Energy Drinks',
            Author: 'Tuptuptj',
            StoryContent:'There once was a man who stayed up for hours on end, averaging an hour of sleep for every day that he was awake. He was fueled mainly by ramen noodles and caffeine. His eyes were constantly bloodshot and dark rings formed around them, seemingly stuck to his face like ink. And yet everything else was otherwise clean, from his face to the clothes that he wore, which held little variance throughout the weeks he spent in and out of his home. “There’s always money to be made,” he thought to himself from the moment he woke up from his hour of rest. Though, there was always little that he carried in his pockets, or in his bank account for that matter. The money left from his hands just as quickly as it came into them, from a combination of high taxes, rent payment, and a plethora of utility fees. The rest of that money went to energy drinks and coffee, which he would drink multiples of in a day. He worked doing multiple jobs, though he was frequently lacking the energy to do them, especially so when money became tight and he would need to choose between noodles and coffee. He usually chose to spend the remainder of his money on a bulk package of cup noodles. Usually. One night he was coming home from his job inside a factory and decided to visit a convenience store. A sign outside the door read “All purchases final. No refunds”. He walked in, expecting to walk into the food aisle and see the usual package of cup ramen. Much to his dismay, he found the aisle to be largely devoid of noodles, or any source of nutrition for that matter. Disgruntled and drowsy he walked away and started to head for the exit, when something caught his eye. The store was running a clearance sale of energy drinks. By impulse he proceeded to sprint over and grabbed around six cans, worth enough to deplete the rest of his savings left over from the bills he’d paid the week before. He drove himself home in his luxury sedan, the drinks left in a bag on the passenger seat. Once he was home he began to do some remote work on a PC he built, drinking up most of the cans throughout the night, till he fell asleep at his chair for an hour, just as the sun was rising. It was only after he had woken up, face buried on his keyboard, that he had realized what kind of predicament he had inadvertently put himself in. He would need to figure out how he would sustain himself with no food, and only a single energy drink left…',
    
        }
    ];

    try {
        await Stories.deleteMany({});
        await Stories.insertMany(seedStories);
        console.log('Database seeded successfully');
    } catch (error) {
        console.error('Error seeding database:', error);
    }
};

router.get('/data/seed', async (req, res) => {
    try {
        await seedDB();
        res.status(200).json({ message: 'Database seeded successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error seeding database', error });
    }
});
module.exports = router