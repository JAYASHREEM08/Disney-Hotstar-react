import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    } else {
      navigate('/search');
    }
  };

  return (
    <nav className="navbar">
      <div className="left-nav">
        <Link to="/" className="logo" style={{ textDecoration: 'none' }}>
          DISNEY+ HOTSTAR
        </Link>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <a href="#tv">TV</a>
          <a href="#movies">Movies</a>
          <a href="#sports">Sports</a>
        </div>
      </div>

      <div className="user-actions">
        <form onSubmit={handleSearchSubmit} className="search-box">
          <input 
            type="text" 
            name="q" 
            className="search-input" 
            placeholder="Search movies..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="nav-btn">Search</button>
        </form>
        <Link to="/profile" className="profile-btn">
          <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Profile" />
          <span>Profile</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;