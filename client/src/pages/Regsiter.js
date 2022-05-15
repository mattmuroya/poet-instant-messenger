import { Link } from "react-router-dom";
import windowsLogo from "../assets/windows-logo.png";

export default function Regsiter() {
  return (
    <section>
      <div className="window" style={{ width: "300px" }}>
        <div className="title-bar">
          <div className="title-bar-text">
            Register - Poet Instant Messenger
          </div>
          <div className="title-bar-controls">
            {/* <button aria-label="Minimize"></button>
            <button aria-label="Maximize"></button> */}
            <button aria-label="Close"></button>
          </div>
        </div>
        <div className="window-body">
          <img
            src={windowsLogo}
            alt="register"
            style={{ width: "100%", paddingBottom: "10px" }}
          />
          <form>
            <div className="field-row-stacked">
              <label htmlFor="username">Username</label>
              <input id="username" type="text" />
            </div>
            <div className="field-row-stacked">
              <label htmlFor="email">E-mail Address</label>
              <input id="email" type="email" />
            </div>
            <div className="field-row-stacked">
              <label htmlFor="password">Password</label>
              <input id="password" type="password" />
            </div>
            <div className="field-row-stacked">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input id="confirmPassword" type="Password" />
            </div>
            <div className="field-row" style={{ justifyContent: "flex-end" }}>
              <button>Register</button>
            </div>
            <div className="field-row">
              <p>
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
