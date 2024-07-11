import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Story from '../models/story';

export const getStory = async (req: Request, res: Response) => {
  try {
    const story = await Story.findById(req.params.id).populate('comments');
    if (!story) {
      return res.status(404).send('Story not found');
    }
    res.send(story);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const addComment = async (req: Request, res: Response) => {
  try {
    const story = await Story.findById(req.params.storyId);
    if (!story) {
      return res.status(404).send('Story not found');
    }

    const newComment = {
      content: req.body.content,
      author: req.body.author,
      _id: new mongoose.Types.ObjectId().toString(),
    };

    story.comments.push(newComment as any);
    await story.save();
    res.send(story);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const createStory = async (req: Request, res: Response) => {
    try {
      const newStory = new Story({
        Title: req.body.Title,
        StoryContent: req.body.StoryContent,
        Author: req.body.Author,
      });
      const savedStory = await newStory.save();
      res.send(savedStory);
    } catch (error) {
      res.status(500).send(error);
    }
  };
  