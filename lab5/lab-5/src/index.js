import './index.css';
import App from './components/App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>

    <Routes>
      <Route path="/" element={ <React.StrictMode> <App /> </React.StrictMode> } />

        </Routes>
        </BrowserRouter>
);
