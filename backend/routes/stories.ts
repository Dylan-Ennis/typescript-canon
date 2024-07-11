import { Router } from 'express';
import { getStory, addComment, createStory } from '../controllers/storyController';

const router = Router();

router.get('/:id', getStory);
router.post('/:storyId/comments', addComment);
router.post('/', createStory);

export default router;
