import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

import Sidebar from "../components/Sidebar";
import ChatContainer from "../components/ChatContainer";
import TitleBar from "../components/TitleBar";

export default function Home() {
  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  return (
    user && (
      <div className="window home-window">
        <TitleBar title="Home" />
        <div className="window-body">
          <Sidebar />
          <ChatContainer />
        </div>
        <div className="status-bar">
          <p className="status-bar-field">Press F1 for help</p>
          <p className="status-bar-field">Slide 1</p>
          <p className="status-bar-field">CPU Usage: 14%</p>
        </div>
      </div>
    )
  );
}
