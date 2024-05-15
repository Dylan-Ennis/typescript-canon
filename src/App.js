import { BrowserRouter, Router } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter />
      <Router>
      <header style={{  backgroundColor: 'black', padding:"10px", position: "sticky", top: "0", zIndex: "999" }}>
      <h1 style={{color: "#b8860b", margin:"0", backgroundColor: 'black'}}>Canon</h1>
      <script src="https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js" crossorigin></script>
        </header>

      <div className="App-header"/>


      </Router>
    </div>
  );
}


export default App;