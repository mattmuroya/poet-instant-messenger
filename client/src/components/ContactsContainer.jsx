// import ChatRoomList from "./ChatRoomList";
import FriendsList from "./FriendsList";
import AllUsersList from "./AllUsersList";

export default function ContactsContainer({
  mobile,
  setMobile,
  chatListExpanded,
  setChatListExpanded,
}) {
  return (
    <div
      className={`contacts-container ${
        mobile ? (chatListExpanded ? "expanded" : "collapsed") : ""
      }`}
    >
      <ul className="tree-view contact-list">
        {/* <ChatRoomList setChatListExpanded={setChatListExpanded} /> */}
        <FriendsList
          setMobile={setMobile}
          setChatListExpanded={setChatListExpanded}
        />
        <AllUsersList />
      </ul>
    </div>
  );
}
