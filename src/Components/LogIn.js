import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LogIn.css';

function LogIn() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("")
  const [userPassword, setUserPassword] = useState("")

  const logInStudent = async () => {
    let user = {
      email: userEmail,
      password : userPassword
    }
      const res = await fetch(`http://localhost:5050/logIn`, {
        method:"POST",
        headers : {
          "Content-type":"application/json"
        },
        body : JSON.stringify(user)
      }).then(navigate("/student"))
      .catch(console.log("error"))
      // const data = res.json
      // console.log(data);
  };

  const logInProf = () => {
    navigate("/professor");
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <h1>Log In</h1>
      </div>
      <div className="login-form">
        <input type="text" placeholder="Username" className="login-input" value={userEmail} onChange={(value) => setUserEmail(value)}/>
        <input type="password" placeholder="Password" className="login-input" value={userPassword} onChange={(value) => setUserPassword(value)} />
      </div>
      <div className="login-buttons">
        <button onClick={logInStudent} className="login-button">Log In as Student</button>
        <button onClick={logInProf} className="login-button">Log In as Professor</button>
      </div>
    </div>
  );
}

export default LogIn;
