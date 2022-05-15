import { Link } from "react-router-dom";
import windowsLogo from "../assets/windows-logo.png";

export default function Login() {
  return (
    <section>
      <div className="window" style={{ width: "350px" }}>
        <div className="title-bar">
          <div className="title-bar-text">Login - Poet Instant Messenger</div>
          <div className="title-bar-controls">
            {/* <button aria-label="Minimize"></button>
            <button aria-label="Maximize"></button> */}
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
            <div className="field-row">
              <p>
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
