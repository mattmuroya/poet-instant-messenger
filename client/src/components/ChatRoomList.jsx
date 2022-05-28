import { useContext } from "react";
import { Context } from "../contexts/Context";

export default function ChatRoomList({ setChatListExpanded }) {
  const chatrooms = [{ name: "General", id: "general", isChatroom: true }];

  const { setChat } = useContext(Context);

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
              {chatrooms.map((room) => (
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
