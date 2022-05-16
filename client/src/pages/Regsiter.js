import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import windowsLogo from "../assets/windows-logo.png";

export default function Regsiter() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const inputsAreValid = () => {
    if (!username || !password) {
      alert("Username and password required.");
      return false;
    } else if (username.length > 32) {
      alert("Username limited to 32 characters.");
      return false;
    } else if (password.length < 8) {
      alert("Password must be at least 8 characters.");
      return false;
    } else if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return false;
    }
    return true;
  };

  const handleRegistration = async (e) => {
    try {
      e.preventDefault();
      if (inputsAreValid()) {
        const { data } = await axios.post("/api/users/register", {
          username,
          password,
        });
        console.log(data);
      }
    } catch (error) {
      console.error(error.response);
      alert(error.response.data.error);
    }
    //
  };

  return (
    <section>
      <div className="window" style={{ width: "300px" }}>
        <div className="title-bar">
          <div className="title-bar-text">
            Register - Poet Instant Messenger
          </div>
          <div className="title-bar-controls">
            <button aria-label="Close"></button>
          </div>
        </div>
        <div className="window-body">
          <img
            src={windowsLogo}
            alt="register"
            style={{ width: "100%", paddingBottom: "10px" }}
          />
          <form onSubmit={(e) => handleRegistration(e)}>
            <div className="field-row-stacked">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="field-row-stacked">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="field-row-stacked">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                type="Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="field-row" style={{ justifyContent: "flex-end" }}>
              <button>Register</button>
            </div>
          </form>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
