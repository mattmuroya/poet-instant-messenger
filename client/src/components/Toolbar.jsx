export default function Toolbar({
  mobile,
  chatListExpanded,
  setChatListExpanded,
  handleLogout,
}) {
  return (
    <div className="toolbar">
      <button onClick={handleLogout}>Sign Out</button>
      {mobile && !chatListExpanded && (
        <button onClick={() => setChatListExpanded(true)}>◀ Friend List</button>
      )}
    </div>
  );
}
