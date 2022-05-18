import { useEffect, useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

import axios from "axios";
import windowsLogo from "../assets/images/windows-logo.png";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const { setUser } = useContext(UserContext);

  const { savedUser, authCheckCompleted } = useAuth();

  useEffect(() => {
    window.history.replaceState(null, "");
  }, []);

  useEffect(() => {
    console.log("hi there");
    if (savedUser) navigate("/");
  }, [savedUser, navigate]);

  const inputsAreValid = () => {
    if (!username || !password) {
      setErrorMessage("Username and password required.");
      return false;
    }
    return true;
  };

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      if (inputsAreValid()) {
        const { data } = await axios.post("/api/users/login", {
          username,
          password,
        });
        console.log(data);
        localStorage.setItem("poet_user", JSON.stringify(data));
        setUser(data);
        navigate("/");
      }
    } catch (error) {
      console.error(error.response);
      setErrorMessage(error.response.data.error);
    }
  };

  const handleLoginAsGuest = () => {
    console.log("to implement: set guest user");
    navigate("/");
  };

  return (
    authCheckCompleted &&
    !savedUser && (
      <div className="window login-window">
        <div className="title-bar">
          <div className="title-bar-text">Login - Poet Instant Messenger</div>
          <div className="title-bar-controls">
            <button aria-label="Close"></button>
          </div>
        </div>
        <div className="window-body">
          <img src={windowsLogo} alt="login" />
          <div className="error-message">{errorMessage}</div>
          {location.state && (
            <div className="success-message">
              {location.state.successMessage}
            </div>
          )}
          <form onSubmit={(e) => handleLogin(e)}>
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
            <div className="field-row" style={{ justifyContent: "flex-end" }}>
              <button>Login</button>
            </div>
          </form>
          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
          <p>
            Or, login as a{" "}
            <button className="link-button" onClick={handleLoginAsGuest}>
              Guest
            </button>
          </p>
        </div>
      </div>
    )
  );
}
