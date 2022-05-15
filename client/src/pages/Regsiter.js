import { Link } from "react-router-dom";

export default function Regsiter() {
  return (
    <section>
      <div className="window" style={{ width: "300px" }}>
        <div className="title-bar">
          <div className="title-bar-text">
            Poet Instant Messenger - Register
          </div>
          <div className="title-bar-controls">
            {/* <button aria-label="Minimize"></button>
            <button aria-label="Maximize"></button> */}
            <button aria-label="Close"></button>
          </div>
        </div>
        <div className="window-body">
          <img
            src="https://images.unsplash.com/photo-1502472584811-0a2f2feb8968?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"
            alt="welcome"
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
                Already have an account? <Link to="/Login">Login</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
