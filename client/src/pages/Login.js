import { Link } from "react-router-dom";

export default function Login() {
  return (
    <section>
      <div className="window" style={{ width: "300px" }}>
        <div className="title-bar">
          <div className="title-bar-text">Poet Instant Messenger - Login</div>
          <div className="title-bar-controls">
            {/* <button aria-label="Minimize"></button>
            <button aria-label="Maximize"></button> */}
            <button aria-label="Close"></button>
          </div>
        </div>
        <div className="window-body">
          <img
            src="https://images.unsplash.com/photo-1531419859879-934d18f6c42d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
            alt="welcome"
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
