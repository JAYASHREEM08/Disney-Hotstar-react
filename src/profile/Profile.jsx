import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Account from "./Account";
import Watchlist from "./Watchlist";
import ContinueWatching from "./ContinueWatching";
import Downloads from "./Downloads";
import Settings from "./Settings";
import HelpCenter from "./HelpCenter";
import "./profile.css";

const Profile = () => {
  const [activeSection, setActiveSection] = useState("account");

  const renderSection = () => {
    switch (activeSection) {
      case "account":
        return <Account />;
      case "watchlist":
        return <Watchlist />;
      case "continue":
        return <ContinueWatching />;
      case "downloads":
        return <Downloads />;
      case "settings":
        return <Settings />;
      case "help":
        return <HelpCenter />;
      default:
        return <Account />;
    }
  };

  return (
    <div className="profile-container">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <div className="profile-content">

    <button
    className="back-btn"
    onClick={() => window.history.back()}
>
    ← Back
</button>

{renderSection()}

      </div>
    </div>
  );
};

export default Profile;
