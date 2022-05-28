import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Context } from "../contexts/Context";
import ContactActionButton from "./ContactActionButton";

export default function AllUsersList() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const { user, setUser } = useContext(Context);

  // console.log(user);

  // const allUsers = [
  //   "BritneySpears",
  //   "JustinTimberlake",
  //   "KurtCobain",
  //   "Madonna",
  //   "MariahCarey",
  // ];

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("/api/users/redacted", {
        headers: {
          Authorization: `bearer ${localStorage.getItem("poet_auth_token")}`,
        },
      });
      const users = data.users;
      setUsers(users);
    })();
  }, []);

  const usersToShow = users.filter((elem) => {
    return !(
      user.id === elem.id ||
      user.friends.some((e) => e.id === elem.id) ||
      user.invitesReceived.some((e) => e.id === elem.id) ||
      user.invitesSent.some((e) => e.id === elem.id)
    );
  });

  const usersToShowFiltered = usersToShow.filter((user) => {
    return user.username.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleSendInvite = async (userFromList) => {
    try {
      await axios.put(
        "/api/users/invite/",
        { recipientId: userFromList.id },
        {
          headers: {
            Authorization: `bearer ${localStorage.getItem("poet_auth_token")}`,
          },
        }
      );
      // hopefully if the put request fails, the following code doesn't execute
      const newUserState = {
        ...user,
        invitesSent: user.invitesSent.concat([userFromList]),
      };
      setUser(newUserState);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <li className="top">
      <strong style={{ color: "purple" }}>✨ Find Friends ✨</strong>
      <ul>
        <li>
          <details open>
            <summary>All Users</summary>
            <ul>
              <input
                style={{ margin: "4px 0px" }}
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {usersToShowFiltered.map((userFromList) => (
                <li key={userFromList.id}>
                  {userFromList.username}{" "}
                  <ContactActionButton
                    action={() => handleSendInvite(userFromList)}
                    text="invite"
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
