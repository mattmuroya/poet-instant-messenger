import { useContext } from "react";
import { Context } from "../contexts/Context";

import windowsLogo from "../assets/images/windows-logo.png";

export default function Taskbar() {
  const { user } = useContext(Context);

  const handleStartButtonClick = () => {
    alert(user ? `hello, ${user.username}!` : "please login");
  };

  return (
    <div className="taskbar">
      <button className="start-button" onClick={handleStartButtonClick}>
        <img src={windowsLogo} alt="start" />
        <span>Start</span>
      </button>
    </div>
  );
}
