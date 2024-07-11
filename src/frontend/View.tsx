import React, { useEffect, useState } from 'react';

interface Story {
  _id: string;
  Title: string;
  StoryContent: string;
  Author: string;
  comments: Comment[];
}

interface Comment {
  _id: string;
  content: string;
  author: string;
}

const View: React.FC = () => {
  const [story, setStory] = useState<Story | null>(null);

  useEffect(() => {
    const storyId = '6649c146f67e417ecc2ef597'; // Our first story
    const URL = `https://canon-backend.onrender.com/stories/${storyId}`;

    fetch(URL)
      .then(response => response.json())
      .then(data => setStory(data))
      .catch(error => console.error('Error fetching story:', error));
  }, []);

  if (!story) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{story.Title}</h1>
      <p>{story.StoryContent}</p>
      <h3>Comments:</h3>
      {story.comments.map(comment => (
        <div key={comment._id}>
          <p>{comment.content}</p>
          <p>Author: {comment.author}</p>
        </div>
      ))}
    </div>
  );
};

export default View;
