import React from 'react';
import App from '../App';

function Main({stories}) {
  return(
  <App>
    <div className='story' style= {{color:"black",backgroundColor:"#897e5d"}}>
      <p>{stories.storycontent}</p>
    </div>
    <nav style={{color:"#897e5d",}}>Info Log:
    <ul>
            <li>Original Title: {stories.Title}</li>
            <li>Original Author: {stories.Author}</li>
            <li>Word Count: 500</li>
            <li>Canon Continuations: 10</li>
            <li>Fanon Continuations: 30</li>
          </ul>
    </nav>

  
  </App>

  )
}

export default Main;