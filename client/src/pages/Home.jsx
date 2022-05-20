import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

import TitleBar from "../components/TitleBar";
import MobileNav from "../components/MobileNav";
import Sidebar from "../components/Sidebar";
import ChatContainer from "../components/ChatContainer";

export default function Home() {
  const [mobile, setMobile] = useState(false);
  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  const mobileNav = useRef();
  const sidebar = useRef();
  const chatContainer = useRef();

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  useEffect(() => {
    if (window.innerWidth < 600) {
      setMobile(true);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleResize = () => {
    // only re-renders if the value changes
    window.innerWidth < 600 ? setMobile(true) : setMobile(false);
  };

  return (
    user && (
      <div className="window home-window">
        <TitleBar title="Home" />
        {mobile && <MobileNav innerRef={mobileNav} />}
        <div className="window-body">
          <Sidebar innerRef={sidebar} mobile={mobile} />
          <ChatContainer innerRef={chatContainer} mobile={mobile} />
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
