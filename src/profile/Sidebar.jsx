import React from "react";
import {
  FaUser,
  FaHeart,
  FaPlayCircle,
  FaDownload,
  FaCog,
  FaQuestionCircle,
  FaSignOutAlt,
  FaCrown,
} from "react-icons/fa";

const Sidebar = ({ activeSection, setActiveSection }) => {
  const menuItems = [
    { id: "account", name: "Account", icon: <FaUser /> },
    { id: "watchlist", name: "Watchlist", icon: <FaHeart /> },
    { id: "continue", name: "Continue Watching", icon: <FaPlayCircle /> },
    { id: "downloads", name: "Downloads", icon: <FaDownload /> },
    { id: "settings", name: "Settings", icon: <FaCog /> },
    { id: "help", name: "Help Center", icon: <FaQuestionCircle /> },
  ];

  const handleLogout = () => {
    const logout = window.confirm("Are you sure you want to logout?");
    if (logout) {
      alert("Logged Out Successfully!");
    }
  };

  return (
    <div className="sidebar">

      <div className="profile-header">
        <img
          src="https://i.pravatar.cc/200?img=12"
          alt="Profile"
          className="profile-image"
        />

        <h2>Peter Parker</h2>

        <p>peterparker@gmail.com</p>

        <div className="premium">
          <FaCrown /> Premium Annual
        </div>
      </div>

      <div className="menu">

        {menuItems.map((item) => (
          <div
            key={item.id}
            className={`menu-item ${
              activeSection === item.id ? "active" : ""
            }`}
            onClick={() => setActiveSection(item.id)}
          >
            <span>{item.icon}</span>
            <span>{item.name}</span>
          </div>
        ))}

      </div>

      <button className="logout-btn" onClick={handleLogout}>
        <FaSignOutAlt /> Logout
      </button>

    </div>
  );
};

export default Sidebar;