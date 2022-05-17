import { useEffect, useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

import axios from "axios";
import windowsLogo from "../assets/windows-logo.png";
import styled from "styled-components";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const { setUser } = useContext(UserContext);

  useEffect(() => {
    // clear the 'registration successful' message on reload
    window.history.replaceState(null, "");
  }, []);

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
    <section>
      <div className="window" style={{ width: "300px" }}>
        <div className="title-bar">
          <div className="title-bar-text">Login - Poet Instant Messenger</div>
          <div className="title-bar-controls">
            <button aria-label="Close"></button>
          </div>
        </div>
        <div className="window-body">
          <img
            src={windowsLogo}
            alt="login"
            style={{ width: "100%", paddingBottom: "10px" }}
          />
          <ErrorMessage>{errorMessage}</ErrorMessage>
          {location.state && (
            <SuccessMessage>{location.state.successMessage}</SuccessMessage>
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
            <LinkButton onClick={handleLoginAsGuest}>Guest</LinkButton>
          </p>
        </div>
      </div>
    </section>
  );
}

const ErrorMessage = styled.div`
  color: #ff0000;
  padding-bottom: 1rem;
`;

const SuccessMessage = styled.div`
  color: #008000;
  padding-bottom: 1rem;
`;

const LinkButton = styled.button`
  display: inline-block;
  box-shadow: none;
  padding: 0;
  min-width: 0;
  min-height: 0;
  width: auto;
  height: auto;
  color: #0000ff;
  text-decoration: underline;
  cursor: pointer;

  &:focus,
  &:active {
    box-shadow: none !important;
    padding: 0 !important;
    outline: 1px dotted #0000ff;
    outline-offset: 0px;
  }
`;
