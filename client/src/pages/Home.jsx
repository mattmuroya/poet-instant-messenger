import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../contexts/Context";

import TitleBar from "../components/TitleBar";
import Toolbar from "../components/Toolbar";
import ContactsContainer from "../components/ContactsContainer";
import ChatContainer from "../components/ChatContainer";

export default function Home() {
  const [mobile, setMobile] = useState(false);
  const [chatListExpanded, setChatListExpanded] = useState(true);

  const { user, chat } = useContext(Context);

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
      localStorage.removeItem("poet_auth_token");
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
          <p className="status-bar-field">
            Welcome, <strong>{user.username}</strong>!
          </p>
          <p className="status-bar-field">
            Currenty chatting with <strong>{chat.username}</strong>.
          </p>
        </div>
      </div>
    )
  );
}
