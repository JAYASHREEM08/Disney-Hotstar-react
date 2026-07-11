import React, { useState } from "react";

const Settings = () => {
  const [videoQuality, setVideoQuality] = useState("4K");
  const [language, setLanguage] = useState("English");
  const [autoplay, setAutoplay] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  const saveSettings = () => {
    alert("Settings Saved Successfully!");
  };

  return (
    <div className="settings-section">
      <h1>Settings</h1>

      <div className="settings-card">

        <div className="setting-row">
          <label>Video Quality</label>
          <select
            value={videoQuality}
            onChange={(e) => setVideoQuality(e.target.value)}
          >
            <option>Auto</option>
            <option>HD</option>
            <option>Full HD</option>
            <option>4K</option>
          </select>
        </div>

        <div className="setting-row">
          <label>Language</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option>English</option>
            <option>Tamil</option>
            <option>Hindi</option>
            <option>Telugu</option>
            <option>Malayalam</option>
          </select>
        </div>

        <div className="setting-row">
          <label>Autoplay Next Episode</label>
          <input
            type="checkbox"
            checked={autoplay}
            onChange={() => setAutoplay(!autoplay)}
          />
        </div>

        <div className="setting-row">
          <label>Notifications</label>
          <input
            type="checkbox"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
          />
        </div>

        <div className="setting-row">
          <label>Dark Mode</label>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
        </div>

        <button className="save-btn" onClick={saveSettings}>
          Save Settings
        </button>

      </div>
    </div>
  );
};

export default Settings;