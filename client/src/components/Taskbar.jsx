import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

import styled from "styled-components";
import windowsLogo from "../assets/windows-logo.png";

export default function Taskbar() {
  const { user } = useContext(UserContext);

  const handleStartButtonClick = () => {
    alert(user ? `hello, ${user.username}!` : "please login");
  };

  return (
    <Bar>
      <StartButton onClick={handleStartButtonClick}>
        <img src={windowsLogo} alt="welcome" style={{ height: "1.4rem" }} />
        <span>Start</span>
      </StartButton>
    </Bar>
  );
}

const Bar = styled.div`
  height: 32px;
  width: 100%;
  padding: 4px 3px 3px;
  box-sizing: border-box;
  position: fixed;
  bottom: 0;
  box-shadow: inset 0 1px #dfdfdf, inset 0 2px #ffffff;
  background: #c0c0c0;
`;

const StartButton = styled.button`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: bold;
  -webkit-font-smoothing: none !important;
`;
