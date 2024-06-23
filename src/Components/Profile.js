import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import UserIcon from '../Assets/user.png';

function Profile() {
  const navigate = useNavigate();

  const logOut = () => {
    // Perform logout logic here
    navigate("/login");
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Profile</h1>
      </div>
      <div className="profile-content">
        <div className="profile-image">
          <img src={UserIcon} alt="Profile" className="profile-icon" />
        </div>
        <div className="profile-details">
          <div className="profile-field">
            <span className="field-label">First Name:</span>
            <span className="field-value">John</span>
          </div>
          <div className="profile-field">
            <span className="field-label">Last Name:</span>
            <span className="field-value">Doe</span>
          </div>
        </div>
      </div>
      <button onClick={logOut} className="logout-button">Log Out</button>
    </div>
  );
}

export default Profile;
