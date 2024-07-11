import React, { useState, useEffect } from "react";

interface Story {
  StoryContent: string;
  _id: string;
}

const Expand: React.FC = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [open, setOpen] = useState<{ [key: number]: boolean }>({});

  const expand = (index: number) => {
    setOpen((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  useEffect(() => {
    fetch('https://canon-backend.onrender.com/stories')
      .then((response) => response.json())
      .then((data) => setStories(data))
      .catch((error) => console.error('Error fetching stories:', error));
  }, []);

  return (
    <div>
      {stories.map((story, index) => (
        <div key={index}>
          <button onClick={() => expand(index)}>Expand</button>
          {open[index] && (
            <div style={{ backgroundColor: '#897e5d', padding: '50px', borderRadius: '5px' }}>
              {story.StoryContent}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Expand;
