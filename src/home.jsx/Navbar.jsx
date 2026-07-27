import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase';

const Navbar = ({ user }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

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
        {user ? (
          <>
            <Link to="/profile" className="profile-btn">
              <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Profile" />
              <span>{user.email?.split('@')[0] || 'Profile'}</span>
            </Link>
            <button
              type="button"
              className="nav-btn"
              onClick={() => signOut(auth).then(() => navigate('/'))}
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="profile-btn">
            <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Profile" />
            <span>Login</span>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;