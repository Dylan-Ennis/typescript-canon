import React, { useState, useEffect } from 'react';


function Main() {
  const [stories, setStories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');


  useEffect(() => {
    // Fetch stories from the backend when the component mounts
    fetch('https://canon-backend.onrender.com/stories')
      .then(response => response.json())
      .then(data => setStories(data))
      .catch(error => console.error('Error fetching stories:', error));
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts




  // Delete
  const handleDeleteComment = async (storyId, commentId) => {
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


  // Update
  const handleUpdateComment = async (storyId, commentId, updatedContent) => {
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


  // Edit button


  const [editCommentId, setEditCommentId] = useState(null);
  const [editedContent, setEditedContent] = useState('');


  const handleEditButtonClick = (commentId, content) => {
    setEditCommentId(commentId);
    setEditedContent(content);
  };


  const handleSaveButtonClick = (storyId, commentId) => {
    handleUpdateComment(storyId, commentId, editedContent);
    setEditCommentId(null);
  };


  const filteredStories = stories.filter(story =>
    story.Author.toLowerCase().includes(searchQuery.toLowerCase())
  );


   return (
    <div>
      {/* search at the top */}
      <input
        type="text"
        placeholder="Search by Author"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        style={{ marginBottom: '20px', padding: '10px', width: '100%' }}
      />
      {filteredStories.length > 0 ? (
        filteredStories.map(story => (


          // info log section
          <div className='story' key={story._id} style={{ marginBottom: '20px', backgroundColor: '#601910', padding: '20px' }}>
            <div style={{ padding: '5px', marginBottom: '5px', paddingLeft: '25%', paddingRight: '25%', fontSize: '15.8px', position: 'relative' }}>
              <p style={{ backgroundColor: '#897e5d', padding: '5px', borderRadius: '5px' }}>{story.StoryContent.substring(0, 1212)}...</p>
              <nav style={{ position: 'absolute', top: 0, right: 'calc(-5% - 10px)', color: '#897e5d', backgroundColor: 'transparent', padding: '80px', fontSize: '10px' }}>
                <h3>Info Log:</h3>
                <ul style={{ listStyleType: 'none', padding: '0', margin: '0' }}>
                  <li style={{ marginBottom: '5px', fontWeight: 'bold' }}>Original Title: {story.Title}</li>
                  <li style={{ marginBottom: '5px' }}>Original Author: {story.Author}</li>
                  <li style={{ marginBottom: '5px' }}>Word Count: 455</li>
                  <li style={{ marginBottom: '5px' }}>Canon Continuations: 0</li>
                  <li style={{ marginBottom: '5px' }}>Fanon Continuations: 0</li>
                  </ul>
              </nav>
              {/* comment section */}
              <div style={{ margin: '5px', }}>Comments:
                  <ul style={{listStyleType: 'none', padding: 0}}>
                    {story.comments && story.comments.length > 0 ? (
                      story.comments.map(comment => (
                        <li key={comment._id} style={{ marginBottom: '5px' }}>
                          {editCommentId === comment._id ? (
                            <>
                              <input
                                type="text"
                                value={editedContent}
                                onChange={(e) => setEditedContent(e.target.value)}
                              />
                              <button onClick={() => handleSaveButtonClick(story._id, comment._id)}>Save</button>
                            </>
                          ) : (
                            <>
                            {comment.content}
                            <button style={{ marginLeft: "5px"}} onClick={() => handleEditButtonClick(comment._id, comment.content)}>Edit</button>
                            <button style={{ margin: "5px"}} onClick={() => handleDeleteComment(story._id, comment._id)}>Delete</button>
                          </>
                          )}
                        </li>
                      ))
                    ) : (
                      <li>No comments available</li>
                    )}
                </ul>
                </div>
            </div>
          </div>
        ))
      ) : (
        <p>No stories match your search query.</p>
      )}
    </div>
   
  );
}

export default Main;
