const router = require('express').Router();
const Comment = require('../models/comments');
const Stories = require('../models/stories');

// GET all comments for a specific story
router.get('/:storyId/comments', async (req, res) => {
    const { storyId } = req.params;

    try {
        const story = await Stories.findById(storyId).populate('comments');
        if (!story) {
            return res.status(404).json({ message: 'Story not found' });
        }

        const comments = story.comments;
        res.json(comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// POST comment
router.post('/:storyId/comments', async (req, res) => {
    const { storyId } = req.params; 
    const { content, author } = req.body; 

    try {
        const story = await Stories.findById(storyId); 
        if (!story) {
            return res.status(404).json({ message: 'Story not found' });
        }

        const newComment = new Comment({ content, author, storyID: story._id });
        await newComment.save();

        story.comments.push(newComment); 
        await story.save(); 

        res.status(201).json(newComment); 
    } catch (error) {
        console.error('Error creating comment:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Like a comment
router.post('/:storyId/comments/:commentId/like', async (req, res) => {
    const { commentId } = req.params;

    try {
        const comment = await Comment.findByIdAndUpdate(commentId, { $inc: { likes: 1 } }, { new: true });
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.json({ message: 'Comment liked successfully', comment });
    } catch (error) {
        console.error('Error liking comment:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Delete a comment
router.delete('/:storyId/comments/:commentId', async (req, res) => {
    const { commentId } = req.params;

    try {
        const deletedComment = await Comment.findByIdAndDelete(commentId);
        if (!deletedComment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        const story = await Stories.findByIdAndUpdate(
            deletedComment.story,
            { $pull: { comments: commentId } },
            { new: true }
        );

        res.json({ message: 'Comment deleted successfully', deletedComment });
    } catch (error) {
        console.error('Error deleting comment:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// update comment
router.put('/:storyId/comments/:commentId', async (req, res) => {
    const { commentId } = req.params;
    const { content } = req.body;

    try {
        const updatedComment = await Comment.findByIdAndUpdate(
            commentId,
            { content }, 
            { new: true } 
        );

        if (!updatedComment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        res.json({ message: 'Comment updated successfully', updatedComment });
    } catch (error) {
        console.error('Error updating comment:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
