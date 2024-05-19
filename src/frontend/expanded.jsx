import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'react-bootstrap/Button'
import App from '../app';
// import React, { useState } from 'react';

function Expand() {
    const [isExpanded, setIsExpanded] = useState(false);
  
    function handleClick() {
      setIsExpanded(!isExpanded);
    }
  
    return (
      <App>
        <div>
          <p>
            blah blah blah 
            {isExpanded && (
              <span>
                filler text here. need to imput more text.filler text here. need to imput more text.filler text here. need to imput more text.filler text here. need to imput more text.filler text here. need to imput more text.
                filler text here. need to imput more text.filler text here. need to imput more text.filler text here. need to imput more text.filler text here. need to imput more text.
              </span>
            )}
          </p>
          {!isExpanded && (
            <Button variant="primary" onClick={handleClick}>Read more</Button>
          )}
        </div>
      </App>
    );
  }
  
  export default Expand;
  