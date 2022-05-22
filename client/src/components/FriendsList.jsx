import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export default function FriendsList({ setChatListExpanded }) {
  const { user, setUser } = useContext(UserContext);

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

  const handleAcceptInvite = async (invite) => {
    try {
      await axios.put(
        "/api/users/invite/accept",
        { acceptedId: invite.id },
        {
          headers: {
            Authorization: `bearer ${localStorage.getItem("poet_auth_token")}`,
          },
        }
      );
      // hopefully if the put request fails, the following code doesn't execute
      const newUserState = {
        ...user,
        friends: user.friends.concat([invite]),
        invitesReceived: user.invitesReceived.filter((item) => {
          return item.id !== invite.id;
        }),
      };
      setUser(newUserState);
    } catch (error) {
      console.error(error.response.data.error);
    }
  };

  const handleRejectInvite = async (invite) => {
    try {
      await axios.put(
        "/api/users/invite/reject",
        { rejectedId: invite.id },
        {
          headers: {
            Authorization: `bearer ${localStorage.getItem("poet_auth_token")}`,
          },
        }
      );
      const newUserState = {
        ...user,
        invitesReceived: user.invitesReceived.filter((item) => {
          return item.id !== invite.id;
        }),
      };
      setUser(newUserState);
    } catch (error) {
      console.error(error.response.data.error);
    }
  };

  return (
    <li className="top">
      <strong style={{ color: "purple" }}>✨ My Friends ✨</strong>
      <ul>
        {/* <li>
          <details open>
            <summary>
              <span className="li-emoji">🟢</span> Online ({user.friends.length}
              )
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
        </li> */}
        <li>
          <details open>
            <summary>
              <span className="li-emoji">⚪️</span> Offline (
              {user.friends.length})
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
            <summary>Invites Received ({user.invitesReceived.length})</summary>
            <ul>
              {user.invitesReceived.map((invite) => (
                <li key={invite.id}>
                  {invite.username}{" "}
                  <button
                    className="link-button"
                    onClick={() => handleAcceptInvite(invite)}
                  >
                    accept
                  </button>{" "}
                  <button
                    className="link-button"
                    onClick={() => handleRejectInvite(invite)}
                  >
                    reject
                  </button>
                </li>
              ))}
            </ul>
          </details>
        </li>
        <li>
          <details open>
            <summary>Invites Sent ({user.invitesSent.length})</summary>
            <ul>
              {user.invitesSent.map((invite) => (
                <li key={invite.id}>
                  {invite.username}{" "}
                  <button
                    className="link-button"
                    onClick={() => alert("to implement: cancel request")}
                  >
                    cancel
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
