import { Schema, model, Document } from 'mongoose';

interface Comment extends Document {
  content: string;
  author: string;
}

interface StoryDocument extends Document {
  Title: string;
  StoryContent: string;
  Author: string;
  comments: Comment[];
}

const commentSchema = new Schema<Comment>({
  content: { type: String, required: true },
  author: { type: String, required: true },
});

const storySchema = new Schema<StoryDocument>({
  Title: { type: String, required: true },
  StoryContent: { type: String, required: true },
  Author: { type: String, required: true },
  comments: [commentSchema],
});

const Story = model<StoryDocument>('Story', storySchema);

export default Story;
