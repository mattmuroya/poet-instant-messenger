import { useContext, useState } from "react";
import { Context } from "../contexts/Context";

export default function ContactActionButton({ action, text }) {
  const [disabled, setDisabled] = useState(false);

  const { user } = useContext(Context);

  const handleClick = () => {
    setDisabled(true);
    action();
  };

  return (
    <button
      className={`link-button ${user.username === "guest" ? "disabled" : ""}`}
      onClick={handleClick}
      disabled={disabled || user.username === "guest" ? true : false}
    >
      {text}
    </button>
  );
}
