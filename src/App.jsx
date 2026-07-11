import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './home.jsx/Home';
import Profile from './profile/Profile';
import Search from './search/Search';
import './home.jsx/style.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/search" element={<Search />} />
    </Routes>
  );
}

export default App;
