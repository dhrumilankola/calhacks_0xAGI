import React, { useState } from 'react'
import './ProfessorPage.css';
import UserIcon from '../Assets/user.png'
import { useNavigate } from 'react-router-dom';

function Professor() {
const courses = [
    { id: 1, name: 'Mathematics', image: `${UserIcon}`},
    { id: 2, name: 'Science', image:`${UserIcon}` },
    { id: 3, name: 'History', image: `${UserIcon}`},
    { id: 4, name: 'Geography', image: `${UserIcon}` },
    // Add more courses as needed
    ];
const navigate = useNavigate()

const [menuVisible, setMenuVisible] = useState(false);

const toggleMenu = () => {
    setMenuVisible(!menuVisible);
};
  
  return (
    <div className="container">
      <div className="header">
        <div className="profile" onClick={()=> navigate("/profile")}>
          <img
            src={UserIcon}
            alt="Profile"
            className="profile-icon"
          />
          {menuVisible && (
            <div className="profile-menu">
              <div className="menu-item">Edit Profile</div>
              <div className="menu-item">Log Out</div>
            </div>
          )}
        </div>
      </div>
      <div className="course-grid">
        {courses.map(course => (
          <div key={course.id} className="course-item" onClick={() => {navigate(`/professor/${course.name}`)}}>
            <div className="course-image-wrapper">
              <img src={course.image} alt={course.name} className="course-image" />
            </div>
            <div className="course-name">{course.name}</div>
          </div>
        ))}
      </div>
      <button className="add-bot-button" onClick={() => navigate('/addBot')}>New Bot</button>
    </div>
  )
}

export default Professor


