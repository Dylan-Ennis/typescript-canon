import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import Layout from './Components/Layout';
import Create from './Components/Create';
import Expand from './Components/Expand';
import View from './Components/View';
import './index.css';

export default function App () {
    return (
        <BrowserRouter>
        <h1 className="site-name">Canon</h1>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="Create" element={<Create />} />
                <Route path="Expand" element={<Expand />}/>
                <Route path="View" element={<View />} />
            </Route>
        </Routes>
        </BrowserRouter>
    );   
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);