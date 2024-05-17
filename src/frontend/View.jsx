import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

function View({ comments }) {
  const [isExpanded, setIsExpanded] = useState(false);

  function handleClick() {
    setIsExpanded(!isExpanded);
  }

  return (
    <div className="container mt-4">
      <h2>Comments</h2>
      <ListGroup>
        {comments.slice(0, isExpanded ? comments.length : 5).map((comment, index) => (
          <ListGroup.Item key={index}>
            {comment}
          </ListGroup.Item>
        ))}
      </ListGroup>
      {comments.length > 5 && (
        <Button variant="primary" onClick={handleClick} className="mt-3">
          {isExpanded ? 'Show less' : 'Show more'}
        </Button>
      )}
    </div>
  );
}

export default View;
