import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../utils/ApiFunctions";
import { useAuth } from "../Auth/AuthProvider";
import "./Login.css";

const Login = () => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { handleLogin } = useAuth();

  const handleInputChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await loginUser(login);

    if (response && response.token) {
      const token = response.token;
      const user = response.user;

      sessionStorage.setItem("userId", user.id);
      sessionStorage.setItem("userRole", user.role);
      sessionStorage.setItem("token", token);

      handleLogin(token);

      if (user.role === "profesor") {
        navigate("/profesor");
      } else if (user.role === "student") {
        navigate("/student");
      } else {
        navigate("/");
      }
    } else {
      setErrorMessage("Invalid email or password. Please try again.");
      setTimeout(() => setErrorMessage(""), 4000);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Sign In</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={login.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={login.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Sign In
          </button>
        </form>
        <p className="register-text">
          Don't have an account?{" "}
          <span onClick={() => navigate("/signup")} className="register-link">
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
