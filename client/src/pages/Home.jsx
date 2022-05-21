import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

import TitleBar from "../components/TitleBar";
import Toolbar from "../components/Toolbar";
import ContactsContainer from "../components/ContactsContainer";
import ChatContainer from "../components/ChatContainer";

export default function Home() {
  const [mobile, setMobile] = useState(false);
  const [chatListExpanded, setChatListExpanded] = useState(true);

  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  useEffect(() => {
    if (window.innerWidth < 700) {
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
    window.innerWidth < 700 ? setMobile(true) : setMobile(false);
  };

  const handleLogout = () => {
    if (window.confirm("sign out?")) {
      localStorage.removeItem("poet_user");
      navigate("/login");
    }
  };

  return (
    user && (
      <div className="window home-window">
        <TitleBar title="Home" handleLogout={handleLogout} />
        <Toolbar
          mobile={mobile}
          handleLogout={handleLogout}
          chatListExpanded={chatListExpanded}
          setChatListExpanded={setChatListExpanded}
        />
        <div className="window-body">
          <ContactsContainer
            mobile={mobile}
            chatListExpanded={chatListExpanded}
            setChatListExpanded={setChatListExpanded}
          />
          <ChatContainer mobile={mobile} />
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
