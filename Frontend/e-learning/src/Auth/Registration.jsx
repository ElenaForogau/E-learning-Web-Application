import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../utils/ApiFunctions";
import "./Register.css";

const Registration = () => {
  const [registration, setRegistration] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "student",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setRegistration({ ...registration, [e.target.name]: e.target.value });
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      await registerUser(registration);
      setSuccessMessage("Registered successfully!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setErrorMessage(`Registration error: ${error.message}`);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Sign Up</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <form onSubmit={handleRegistration}>
          <div className="input-group">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={registration.firstName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={registration.lastName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={registration.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={registration.password}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="input-group">
            <select
              name="role"
              value={registration.role}
              onChange={handleInputChange}
              required
            >
              <option value="student">Student</option>
              <option value="profesor">Profesor</option>
            </select>
          </div>

          <button type="submit" className="auth-button">
            Register
          </button>
        </form>
        <p className="switch-text">
          Already have an account?{" "}
          <span className="switch-link" onClick={() => navigate("/login")}>
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
};

export default Registration;
