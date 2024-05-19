import React, { useState, useEffect } from 'react';


function Main() {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    // Fetch stories from the backend when the component mounts
    fetch('https://canon-backend.onrender.com/stories')
      .then(response => response.json())
      .then(data => setStories(data))
      .catch(error => console.error('Error fetching stories:', error));
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  return (
    <div>
      {stories.map(story => (
        <div className='story' key={story._id} style={{ marginBottom: '20px', backgroundcolor:'#601910', padding: '20px' }}>
          <div style={{ padding: '5px', marginBottom: '5px', paddingLeft:'25%',paddingRight:'25%', fontSize:'15.8px', position: 'relative' }}>
            <p style={{ backgroundColor: '#897e5d', padding: '5px', borderRadius: '5px' }}>{story.StoryContent.substring(0, 1212)}...</p>
            <nav style={{ position: 'absolute', top: 0, right: 'calc(-5% - 10px)', color: '#897e5d', backgroundColor: 'transparent', padding: '80px',fontSize:'10px' }}>
              <h3> Info Log:</h3>
              <ul style={{ listStyleType: 'none', padding: '0', margin: '0' }}>
                <li style={{ marginBottom: '5px', fontWeight: 'bold' }}>Original Title: {story.Title}</li>
                <li style={{ marginBottom: '5px' }}>Original Author: {story.Author}</li>
                <li style={{ marginBottom: '5px' }}>Word Count: 455</li>
                <li style={{ marginBottom: '5px' }}>Canon Continuations: 0</li>
                <li style={{ marginBottom: '5px' }}>Fanon Continuations: 0</li>
              </ul>
            </nav>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Main;