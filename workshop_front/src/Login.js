import React from "react";
import "./Login.css"; // นำเข้าไฟล์ CSS
import image1 from './images/image 1.png';

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-image">
          <img
            src={image1}
            alt="Warehouse"
          />
        </div>
        <div className="login-form">
          <h2>Log in</h2>
          <p>Hi! Let's get started </p>
          <p>in Warehouse management</p>
          <input
            type="text"
            placeholder="Username"
            className="login-input"
          />
          <input
            type="password"
            placeholder="Password"
            className="login-input"
          />
          <button className="login-button">Log in</button>
          <div className="login-footer">
            <p>Forgot Password <a href="#" className="reset-link"> Reset</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
