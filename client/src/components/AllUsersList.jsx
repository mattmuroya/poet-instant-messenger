import { useState } from "react";

export default function AllUsersList() {
  const [searchTerm, setSearchTerm] = useState("");

  const allUsers = [
    "BritneySpears",
    "JustinTimberlake",
    "KurtCobain",
    "Madonna",
    "MariahCarey",
  ];

  let allUsersFiltered = allUsers.filter((user) => {
    return user.toLowerCase().includes(searchTerm.toLowerCase());
  });

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
              {allUsersFiltered.map((user) => (
                <li key={user}>
                  {user} <button className="link-button">add</button>
                </li>
              ))}
            </ul>
          </details>
        </li>
      </ul>
    </li>
  );
}
