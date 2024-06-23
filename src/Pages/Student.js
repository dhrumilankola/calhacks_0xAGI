import React, { useState } from 'react'
import './CourseGrid.css';
import UserIcon from '../Assets/user.png'

function Student() {
const courses = [
    { id: 1, name: 'Mathematics', image: `${UserIcon}`},
    { id: 2, name: 'Science', image:`${UserIcon}` },
    { id: 3, name: 'History', image: `${UserIcon}`},
    { id: 4, name: 'Geography', image: `${UserIcon}` },
    // Add more courses as needed
    ];

const [menuVisible, setMenuVisible] = useState(false);

const toggleMenu = () => {
    setMenuVisible(!menuVisible);
};
  
  return (
    <div className="container">
      <div className="header">
        <div className="profile" onClick={toggleMenu}>
          <img
            src= {UserIcon}
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
          <div key={course.id} className="course-item">
            <div className="course-image-wrapper">
              <img src={course.image} alt={course.name} className="course-image" />
            </div>
            <div className="course-name">{course.name}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Student


