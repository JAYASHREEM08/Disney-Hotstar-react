import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './home.jsx/Home';
import Profile from './profile/Profile';
import Search from './search/Search';
import Login from './auth/Login';
import { auth } from './firebase/firebase';
import './home.jsx/style.css';

function App() {
  const [user, setUser] = useState(auth.currentUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', background: '#0f172a' }}>Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={<Home user={user} />} />
      <Route path="/login" element={user ? <Navigate to="/profile" replace /> : <Login />} />
      <Route path="/profile" element={user ? <Profile user={user} /> : <Navigate to="/login" replace />} />
      <Route path="/search" element={<Search />} />
    </Routes>
  );
}

export default App;
