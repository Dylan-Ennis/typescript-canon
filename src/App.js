import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

import './App.css';

import Create from './Components/Create'
import Expand from './Components/Expand'
import View from './Components/View'

function App() {
  return (
    <div className="App">
      <Router>
      <header style={{  backgroundColor: 'black', padding:"10px", position: "sticky", top: "0", zIndex: "999" }}>
      <script src="https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js" crossorigin></script>
        <h1 style={{color: "#b8860b", margin:"0", }}>Canon</h1>
        <div className="navBar">
          <ul>
          <li>
            <Link to="/Create">Create</Link>
          </li>
          <li>
            <Link to="/Expand">Expand</Link>
          </li>
          <li>
            <Link to="/View">View</Link>
          </li>
          </ul>
        </div>
        </header>

      <div className="App-header"/>

    

      </Router>
    </div>
  );
}


export default App;