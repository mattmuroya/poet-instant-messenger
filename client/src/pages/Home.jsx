import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { UserContext } from "../contexts/UserContext";

export default function Home() {
  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  return (
    user && (
      <div className="window home-window">
        <div className="title-bar">
          <div className="title-bar-text">Home - Poet Instant Messenger</div>
          <div className="title-bar-controls">
            <button aria-label="Close"></button>
          </div>
        </div>
        <div className="window-body">
          <Sidebar />
        </div>
      </div>
    )
  );
}
