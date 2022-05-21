import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export default function FriendsList({ setChatListExpanded }) {
  const { user } = useContext(UserContext);

  // for development. data to be fetched from the server in prod.
  // const onlineFriends = ["lalib035", "N8DaBballPlaya", "TipDaddy78"];
  // const offlineFriends = [
  //   "p0k3m0n_m45t3r",
  //   "lifesAboxOchocolates",
  //   "xXx_NIRVANA_xXx",
  //   "iLuvNickCarter99",
  // ];
  // const invitesReceived = ["amell013"];
  // const invitesSent = ["TheKid65", "ZeldaLuvvr94"];

  // NOTE: need to figure out whether/how to handle online vs. offline users.
  // maybe just show single list and status indicator by each user?

  return (
    <li className="top">
      <strong style={{ color: "purple" }}>✨ My Friends ✨</strong>
      <ul>
        <li>
          <details open>
            <summary>
              <span className="li-emoji">🟢</span> Online (2)
            </summary>
            <ul>
              {user.friends.map((friend) => (
                <li key={friend.id}>
                  <button
                    className="link-button"
                    onClick={() => setChatListExpanded(false)}
                  >
                    {friend.username}
                  </button>
                </li>
              ))}
            </ul>
          </details>
        </li>
        <li>
          <details open>
            <summary>
              <span className="li-emoji">⚪️</span> Offline (2)
            </summary>
            <ul>
              {user.friends.map((friend) => (
                <li key={friend.id}>
                  <button
                    className="link-button"
                    onClick={() => setChatListExpanded(false)}
                  >
                    {friend.username}
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
              {user.invitesReceived.map((invite) => (
                <li key={invite.id}>
                  {invite.username}{" "}
                  <button className="link-button">accept</button>{" "}
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
              {user.invitesSent.map((invite) => (
                <li key={invite.id}>
                  {invite.username}{" "}
                  <button className="link-button">cancel</button>
                </li>
              ))}
            </ul>
          </details>
        </li>
      </ul>
    </li>
  );
}
