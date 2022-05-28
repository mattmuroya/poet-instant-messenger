import axios from "axios";
import { useContext } from "react";
import { Context } from "../contexts/Context";
import ContactActionButton from "./ContactActionButton";

export default function FriendsList({ setChatListExpanded }) {
  const { user, setUser, chat, setChat } = useContext(Context);

  // useEffect(() => {
  //   if (!chat && user.friends.length > 0) setChat(user.friends[0]);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const handleSwitchChat = (chat) => {
    setChat(chat);
    setChatListExpanded(false);
  };

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

  const handleCancelInvite = async (invite) => {
    try {
      await axios.put(
        "/api/users/invite/cancel",
        { recipientId: invite.id },
        {
          headers: {
            Authorization: `bearer ${localStorage.getItem("poet_auth_token")}`,
          },
        }
      );
      console.log(user.invitesSent);
      const newUserState = {
        ...user,
        invitesSent: user.invitesSent.filter((item) => {
          return item.id !== invite.id;
        }),
      };
      console.log(newUserState.invitesSent);
      setUser(newUserState);
    } catch (error) {
      console.error(error.response.data.error);
    }
  };

  return (
    <li className="top">
      <strong style={{ color: "purple" }}>✨ My Friends ✨</strong>
      <ul>
        <li>
          <details open>
            <summary>All Friends ({user.friends.length})</summary>
            <ul>
              {user.friends.map((friend) => (
                <li key={friend.id}>
                  <button
                    className={`link-button ${
                      chat && friend.username === chat.username
                        ? "selected"
                        : ""
                    }`}
                    onClick={() => handleSwitchChat(friend)}
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
                  <ContactActionButton
                    action={() => handleAcceptInvite(invite)}
                    text="accept"
                  />{" "}
                  <ContactActionButton
                    action={() => handleRejectInvite(invite)}
                    text="reject"
                  />
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
                  <ContactActionButton
                    action={() => handleCancelInvite(invite)}
                    text="cancel"
                  />
                </li>
              ))}
            </ul>
          </details>
        </li>
      </ul>
    </li>
  );
}

// const offlineFriends = [
//   "p0k3m0n_m45t3r",
//   "xXx_NIRVANA_xXx",
//   "iLuvNickCarter99",
//   "ZeldaLuvvr94",
// ];
