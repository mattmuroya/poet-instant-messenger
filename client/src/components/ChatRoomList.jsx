import { useContext, useEffect, useState } from "react";
import { Context } from "../contexts/Context";
const axios = require("axios");

export default function ChatRoomList({ setChatListExpanded }) {
  // const chatrooms = [{ name: "General", id: "general", isChatroom: true }];
  const [chatrooms, setChatrooms] = useState(null);

  const { setChat } = useContext(Context);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("/api/chatrooms");
      setChatrooms(data.chatrooms);
    })();
  }, []);

  const handleSwitchChatroom = (room) => {
    console.log("swtiching");
    console.log({ room });
    setChatListExpanded(false);
    setChat(room);
  };

  return (
    <li className="top">
      <strong style={{ color: "purple" }}>✨ Public Chat Rooms ✨</strong>
      <ul>
        <li>
          <details open>
            <summary>All Chats</summary>
            <ul>
              {chatrooms &&
                chatrooms.map((room) => (
                  <li key={room.id}>
                    <button
                      className="link-button"
                      onClick={() => handleSwitchChatroom(room)}
                    >
                      {room.name}
                    </button>
                  </li>
                ))}
            </ul>
          </details>
        </li>
      </ul>
    </li>
  );
}
