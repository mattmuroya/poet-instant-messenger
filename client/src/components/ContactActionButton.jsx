import { useState } from "react";

export default function ContactActionButton({ action, text }) {
  const [disabled, setDisabled] = useState(false);

  const handleClick = () => {
    setDisabled(true);
    action();
  };

  return (
    <button className="link-button" onClick={handleClick} disabled={disabled}>
      {text}
    </button>
  );
}
