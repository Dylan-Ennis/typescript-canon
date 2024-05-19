import React, { useState, useEffect } from "react";

const Expand = () => {
    const [stories, setStories] = useState([]);
    const [open, setOpen] = useState({});

    const expand = (index) => {
        setOpen(prevState => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    };

    useEffect(() => {
        // Fetch stories from the backend when the component mounts
        fetch('https://canon-backend.onrender.com/stories')
            .then(response => response.json())
            .then(data => setStories(data))
            .catch(error => console.error('Error fetching stories:', error));
    }, []);

    return (
        <div>
            {stories.map((story, index) => (
                <div key={index} >
                    <button onClick={() => expand(index)}>Expand</button>
                    {open[index] && <div style={{backgroundColor: '#897e5d', padding: '50px', borderRadius: '5px' }}>{story.StoryContent}</div>}
                </div>
            ))}
        </div>
    );
};

export default Expand;
