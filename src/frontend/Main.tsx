import React, { useState, useEffect, ChangeEvent } from 'react';

interface Story {
  _id: string;
  StoryContent: string;
  Title: string;
  Author: string;
  comments: Comment[];
}

interface Comment {
  _id: string;
  content: string;
}

const Main: React.FC = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [editCommentId, setEditCommentId] = useState<string | null>(null);
  const [editedContent, setEditedContent] = useState<string>('');

  useEffect(() => {
    fetch('https://canon-backend.onrender.com/stories')
      .then(response => response.json())
      .then(data => setStories(data))
      .catch(error => console.error('Error fetching stories:', error));
  }, []);

  const handleDeleteComment = async (storyId: string, commentId: string) => {
    const URL = `https://canon-backend.onrender.com/stories/${storyId}/comments/${commentId}`;

    try {
      const response = await fetch(URL, { method: 'DELETE' });
      if (response.ok) {
        setStories(prevStories => prevStories.map(story => {
          if (story._id === storyId) {
            return {
              ...story,
              comments: story.comments.filter(comment => comment._id !== commentId),
            };
          }
          return story;
        }));
      } else {
        console.error('Failed to delete the comment');
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const handleUpdateComment = async (storyId: string, commentId: string, updatedContent: string) => {
    const URL = `https://canon-backend.onrender.com/stories/${storyId}/comments/${commentId}`;
    const updatedComment = { content: updatedContent };

    try {
      const response = await fetch(URL, {
        method: 'PUT',
        body: JSON.stringify(updatedComment),
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.ok) {
        setStories(prevStories => prevStories.map(story => {
          if (story._id === storyId) {
            return {
              ...story,
              comments: story.comments.map(comment =>
                comment._id === commentId ? { ...comment, content: updatedContent } : comment
              ),
            };
          }
          return story;
        }));
      } else {
        console.error('Failed to update the comment');
      }
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };

  const handleEditButtonClick = (commentId: string, content: string) => {
    setEditCommentId(commentId);
    setEditedContent(content);
  };

  const handleSaveButtonClick = (storyId: string, commentId: string) => {
    handleUpdateComment(storyId, commentId, editedContent);
    setEditCommentId(null);
  };

  const filteredStories = stories.filter(story =>
    story.Author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search by Author"
        value={searchQuery}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
        style={{ marginBottom: '20px', padding: '10px', width: '100%' }}
      />
      {filteredStories.length > 0 ? (
        filteredStories.map(story => (
          <div key={story._id} className="story" style={{ marginBottom: '20px', backgroundColor: '#601910', padding: '20px' }}>
            <div style={{ padding: '5px', marginBottom: '5px', paddingLeft: '25%', paddingRight: '25%', fontSize: '15.8px', position: 'relative' }}>
              <p style={{ backgroundColor: '#897e5d', padding: '5px', borderRadius: '5px' }}>{story.StoryContent.substring(0, 1212)}...</p>
              <nav style={{ textAlign: 'center', paddingTop: '20px', paddingBottom: '20px' }}>
                <h4>{story.Title}</h4>
                <p>{story.Author}</p>
              </nav>
              <div>
                {story.comments.map(comment => (
                  <div key={comment._id}>
                    {editCommentId === comment._id ? (
                      <div>
                        <textarea
                          value={editedContent}
                          onChange={(e) => setEditedContent(e.target.value)}
                          style={{ marginBottom: '10px', width: '100%' }}
                        />
                        <button onClick={() => handleSaveButtonClick(story._id, comment._id)}>Save</button>
                      </div>
                    ) : (
                      <p>{comment.content}</p>
                    )}
                    <button onClick={() => handleDeleteComment(story._id, comment._id)}>Delete</button>
                    {editCommentId !== comment._id && (
                      <button onClick={() => handleEditButtonClick(comment._id, comment.content)}>Edit</button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div style={{ textAlign: 'center' }}>
          <h2>No stories found.</h2>
        </div>
      )}
    </div>
  );
};

export default Main;
