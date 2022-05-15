import { Link, useNavigate } from "react-router-dom";
import windowsLogo from "../assets/windows-logo.png";
import styled from "styled-components";

export default function Login() {
  const navigate = useNavigate();

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
          <form>
            <div className="field-row-stacked">
              <label htmlFor="username">Username</label>
              <input id="username" type="text" />
            </div>
            <div className="field-row-stacked">
              <label htmlFor="password">Password</label>
              <input id="password" type="password" />
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
