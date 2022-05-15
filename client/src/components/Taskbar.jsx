import styled from "styled-components";

export default function Taskbar() {
  return (
    <Bar>
      <StartButton>Start</StartButton>
    </Bar>
  );
}

const Bar = styled.div`
  height: 32px;
  width: 100%;
  padding: 3px 0 4px;
  box-sizing: border-box;
  position: fixed;
  bottom: 0;
  box-shadow: inset 0 1px #dfdfdf, inset 0 2px #ffffff;
  background: #c0c0c0;
`;

const StartButton = styled.button`
  height: 100%;
  margin-left: 2px;
  font-weight: bold;
  -webkit-font-smoothing: none !important;
`;
