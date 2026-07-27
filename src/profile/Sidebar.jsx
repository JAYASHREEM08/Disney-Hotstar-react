import { useEffect, useState } from "react";
import {
  FaUser,
  FaHeart,
  FaHistory,
  FaPlayCircle,
  FaDownload,
  FaCog,
  FaQuestionCircle,
  FaSignOutAlt,
} from "react-icons/fa";

import { auth } from "../firebase/firebase";
import { getUserProfile } from "../profileService";

const Sidebar = ({ activeSection, setActiveSection }) => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      if (auth.currentUser) {
        const data = await getUserProfile(auth.currentUser.uid);
        setProfile(data);
      }
    };

    loadProfile();
  }, []);

  const menuItems = [
    { id: "account", name: "Account", icon: <FaUser /> },
    { id: "mylist", name: "My List", icon: <FaHeart /> },
    { id: "watchlist", name: "Watchlist", icon: <FaHeart /> },
    { id: "history", name: "Watch History", icon: <FaHistory /> },
    { id: "continue", name: "Continue Watching", icon: <FaPlayCircle /> },
    { id: "downloads", name: "Downloads", icon: <FaDownload /> },
    { id: "settings", name: "Settings", icon: <FaCog /> },
    { id: "help", name: "Help Center", icon: <FaQuestionCircle /> },
  ];

  const handleLogout = () => {
    const logout = window.confirm(
      "Are you sure you want to logout?"
    );

    if (logout) {
      alert("Logged Out Successfully!");
    }
  };

  return (
    <div className="sidebar">
      <div className="profile-header">
        <div className="profile-image">
          <FaUser />
        </div>

        <h2>{profile?.name || "User"}</h2>

        <p>{profile?.email || "No email available"}</p>
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
