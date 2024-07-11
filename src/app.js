import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './Main';
import Expand from './Expand';
import View from './View'; 

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/expand" element={<Expand />} />
          <Route path="/view" element={<View />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
