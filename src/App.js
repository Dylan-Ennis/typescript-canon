import { BrowserRouter as Router } from 'react-router-dom';
import { useState } from "react";


import './App.css';

import View from './Components/View';
import Expand from './Components/Expand';
import Comment from './Components/Comment';
import useNode from './hooks/useNode';

const comments = {
  id: 1,
  items: [],
};

function App() {
  const [commentsData, setCommentsData] = useState(comments);
  const { insertNode, editNode, deleteNode } = useNode();

  const handleInsertNode = (folderID, item) => {
    const finalStructure = insertNode(commentsData, folderID, item);
    setCommentsData(finalStructure)
  };

  const handleEditNode = (folderID, value) => {
    const finalStructure = editNode(commentsData, folderID, value);
    setCommentsData(finalStructure);
  };

  const handleDeleteNode = (folderID) => {
    const finalStructure = deleteNode(commentsData, folderID);
    const temp = { ...finalStructure };
    setCommentsData(temp);
  };

  return (
    <div className="App">
      <Router>
      <header style={{  backgroundColor: 'black', padding:"10px", position: "sticky", top: "0", zIndex: "999" }}>
      <h1 style={{color: "#b8860b", margin:"0", backgroundColor: 'black'}}>Canon</h1>
      <script src="https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js" crossorigin></script>
        </header>
      <div className="App-header"/>
    {/* test */}
      <View />
      <Expand label="Expand"/>
      <Comment handleInsertNode={handleInsertNode} handleEditNode={handleEditNode} handleDeleteNode={handleDeleteNode} comment={commentsData} />


      </Router>
    </div>
  );
}


export default App;