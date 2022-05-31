import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../contexts/Context";

import TitleBar from "../components/TitleBar";
import Toolbar from "../components/Toolbar";
import ContactsContainer from "../components/ContactsContainer";
import ChatContainer from "../components/ChatContainer";

import { io } from "socket.io-client";

export default function Home() {
  const [mobile, setMobile] = useState(false);
  const [chatListExpanded, setChatListExpanded] = useState(true);

  const { user, setUser, chat, setChat, socket, setSocket } =
    useContext(Context);

  const navigate = useNavigate();

  useEffect(() => {
    if (window.innerWidth < 800) {
      setMobile(true);
    }
  }, []);

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  useEffect(() => {
    if (user) setSocket(io());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (socket) socket.emit("user_online", user);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleResize = () => {
    window.innerWidth < 800 ? setMobile(true) : setMobile(false);
  };

  const handleLogout = () => {
    if (window.confirm("sign out?")) {
      localStorage.removeItem("poet_auth_token");
      navigate("/login");
      setUser(null);
      setChat(null);
      socket.disconnect();
      setSocket(null);
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
            setMobile={setMobile}
            chatListExpanded={chatListExpanded}
            setChatListExpanded={setChatListExpanded}
          />
          <ChatContainer mobile={mobile} chatListExpanded={chatListExpanded} />
        </div>
        <div className="status-bar">
          <p className="status-bar-field">
            Welcome, <strong>{user.username}</strong>!
          </p>
          {chat && (
            <p className="status-bar-field">
              Currenty chatting with <strong>{chat.username}</strong>.
            </p>
          )}
        </div>
      </div>
    )
  );
}
