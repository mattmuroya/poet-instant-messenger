import { useNavigate } from "react-router-dom";
import Error from "../assets/images/error.png";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="window not-found-window">
      <div className="title-bar">
        <div className="title-bar-text">
          404: Not Found - Poet Instant Messenger
        </div>
        <div className="title-bar-controls">
          {/* <button aria-label="Close"></button> */}
        </div>
      </div>
      <div className="window-body">
        <div className="content">
          <img src={Error} alt="not found" />
          <p>404: Not Found.</p>
        </div>
        <div style={{ display: "flex", flexDirection: "row-reverse" }}>
          <button onClick={() => navigate("/")}>OK</button>
        </div>
      </div>
    </div>
  );
}
