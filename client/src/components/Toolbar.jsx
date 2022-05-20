export default function Toolbar({ mobile }) {
  // const returnToContactList = () => {
  //   //
  // };

  return (
    <div className="toolbar">
      {mobile && <button className="back-button"> &lt; Back</button>}
      <button className="back-button"> Add Friends</button>
      <button className="back-button"> Create A Chat Room</button>
      <button className="back-button"> Sign Out</button>
    </div>
  );
}
