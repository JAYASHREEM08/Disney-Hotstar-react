import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="left-nav">
        <div 
          className="logo" 
          style={{ cursor: 'pointer' }} 
          onClick={() => window.location.href = '/'}
        >
          DISNEY+ HOTSTAR
        </div>
        <div className="nav-links">
          <a href="/">Home</a>
          <a href="#tv">TV</a>
          <a href="#movies">Movies</a>
          <a href="#sports">Sports</a>
        </div>
      </div>

      <div className="user-actions">
        <form action="/detail" method="GET" className="search-box">
          <input 
            type="text" 
            name="q" 
            className="search-input" 
            placeholder="Search movies..." 
          />
          <button type="submit" className="nav-btn">Search</button>
        </form>
        <a href="/profile" className="profile-btn">
          <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Profile" />
          <span>Profile</span>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;