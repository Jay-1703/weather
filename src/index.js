import React from 'react';
import { createRoot } from 'react-dom/client'; // Updated import
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Searchweather from './components/Search/Searchweather';
import Demo from './components/Demo';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>
            <Route element={<App />} path='/'></Route>
            <Route element={<App />} path='/:lat/:lon'></Route>
            <Route element={<Demo />} path='/demo'></Route>
            <Route element={<Searchweather />} path='/search/:lat/:lon'></Route>
        </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, you can continue to use reportWebVitals as you were doing before.
reportWebVitals();
