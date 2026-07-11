import React from "react";

const Account = () => {
  return (
    <div className="account-section">
      <h1>Account Information</h1>

      <div className="info-grid">

        <div className="info-card">
          <h3>Full Name</h3>
          <p>Peter Parker</p>
        </div>

        <div className="info-card">
          <h3>Email</h3>
          <p>peterparker@gmail.com</p>
        </div>

        <div className="info-card">
          <h3>Phone</h3>
          <p>+91 9876543210</p>
        </div>

        <div className="info-card">
          <h3>Membership</h3>
          <p>Premium Annual</p>
        </div>

        <div className="info-card">
          <h3>Member Since</h3>
          <p>January 2025</p>
        </div>

        <div className="info-card">
          <h3>Active Devices</h3>
          <p>3 Devices Connected</p>
        </div>

      </div>

      <div className="account-actions">
        <button className="edit-btn">Edit Profile</button>
        <button className="password-btn">Change Password</button>
      </div>
    </div>
  );
};

export default Account;