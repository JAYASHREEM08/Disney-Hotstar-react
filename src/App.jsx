import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './home.jsx/Home';
import Profile from './profile/Profile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
