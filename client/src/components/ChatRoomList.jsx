export default function ChatRoomList({ setChatListExpanded }) {
  const chatRooms = ["General", "Music", "Movies", "Games", "Technology"];

  return (
    <li className="top">
      <strong style={{ color: "purple" }}>✨ Public Chat Rooms ✨</strong>
      <ul>
        <li>
          <details open>
            <summary>All Chats</summary>
            <ul>
              {chatRooms.map((chatRoom) => (
                <li key={chatRoom}>
                  <button
                    className="link-button"
                    onClick={() => setChatListExpanded(false)}
                  >
                    {chatRoom}
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
