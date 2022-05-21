export default function FriendsList({ setChatListExpanded }) {
  // for development, will be fetched from server later
  const onlineFriends = ["lalib035", "N8DaBballPlaya", "TipDaddy78"];

  const offlineFriends = [
    "p0k3m0n_m45t3r",
    "lifesAboxOchocolates",
    "xXx_NIRVANA_xXx",
    "iLuvNickCarter99",
  ];

  const invitesReceived = ["amell013"];

  const invitesSent = ["TheKid65", "ZeldaLuvvr94"];

  return (
    <li className="top">
      <strong style={{ color: "purple" }}>✨ My Friends ✨</strong>
      <ul>
        <li>
          <details open>
            <summary>
              <span className="li-emoji">🟢</span> Online (3)
            </summary>
            <ul>
              {onlineFriends.map((friend) => (
                <li key={friend}>
                  <button
                    className="link-button"
                    onClick={() => setChatListExpanded(false)}
                  >
                    {friend}
                  </button>
                </li>
              ))}
            </ul>
          </details>
        </li>
        <li>
          <details open>
            <summary>
              <span className="li-emoji">🔴</span> Offline (4)
            </summary>
            <ul>
              {offlineFriends.map((friend) => (
                <li key={friend}>
                  <button
                    className="link-button"
                    onClick={() => setChatListExpanded(false)}
                  >
                    {friend}
                  </button>
                </li>
              ))}
            </ul>
          </details>
        </li>
        <li>
          <details open>
            <summary>Invites Received (1)</summary>
            <ul>
              {invitesReceived.map((invite) => (
                <li key={invite}>
                  {invite} <button className="link-button">accept</button>{" "}
                  <button className="link-button">reject</button>
                </li>
              ))}
            </ul>
          </details>
        </li>
        <li>
          <details open>
            <summary>Invites Sent (2)</summary>
            <ul>
              {invitesSent.map((invite) => (
                <li key={invite}>
                  {invite} <button className="link-button">cancel</button>
                </li>
              ))}
            </ul>
          </details>
        </li>
      </ul>
    </li>
  );
}
