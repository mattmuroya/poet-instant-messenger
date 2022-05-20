import axios from "axios";
import { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();
  const location = useLocation();

  const inputsAreValid = () => {
    if (!username || !password) {
      setErrorMessage("Username and password required.");
      return false;
    }
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (inputsAreValid()) {
        const { data } = await axios.post("/api/users/login", {
          username,
          password,
        });
        localStorage.setItem("poet_user", JSON.stringify(data));
        setUser(data);
        navigate("/");
      }
    } catch (error) {
      setErrorMessage(error.response.data.error);
    }
  };

  const handleLoginAsGuest = (e) => {
    e.preventDefault();
    alert("to implement: set guest user");
    // navigate("/");
  };

  return (
    <form onSubmit={(e) => handleLogin(e)}>
      <p className="error-message">{errorMessage}</p>
      {location.state && (
        <p className="success-message">{location.state.successMessage}</p>
      )}
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
        <button type="submit">Login</button>
      </div>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
        <br />
        Or, login as a{" "}
        <button className="link-button" onClick={handleLoginAsGuest}>
          Guest
        </button>
      </p>
    </form>
  );
}
