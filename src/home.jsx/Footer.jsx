import React from 'react';

const Footer = () => {
  return (
    <footer className="footer" style={{ padding: '20px', textAlign: 'center', color: '#fff' }}>
      <p>&copy; {new Date().getFullYear()} Disney+ Hotstar Clone. All rights reserved.</p>
    </footer>
  );
};

export default Footer;