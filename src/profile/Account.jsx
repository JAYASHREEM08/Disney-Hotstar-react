import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { getUserProfile } from "../profileService";

const Account = () => {
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

  return (
    <div className="account-section">
      <h1>Account Information</h1>

      <div className="info-grid">
        <div className="info-card">
          <h3>Full Name</h3>
          <p>{profile?.name || "User"}</p>
        </div>

        <div className="info-card">
          <h3>Email</h3>
          <p>{profile?.email || "No email available"}</p>
        </div>

        <div className="info-card">
          <h3>Phone</h3>
          <p>{profile?.phone || "No phone number"}</p>
        </div>
      </div>

      <div className="account-actions">
        <button className="edit-btn">
          Edit Profile
        </button>

        <button className="password-btn">
          Change Password
        </button>
      </div>
    </div>
  );
};

export default Account;
