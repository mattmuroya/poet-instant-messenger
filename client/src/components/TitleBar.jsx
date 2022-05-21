import { useLocation } from "react-router-dom";

export default function TitleBar({ title, handleLogout }) {
  const location = useLocation();

  return (
    <div className="title-bar">
      <div className="title-bar-text">{title} - Poet Instant Messenger</div>
      {location.pathname === "/" && (
        <div className="title-bar-controls">
          <button aria-label="Close" onClick={handleLogout}></button>
        </div>
      )}
    </div>
  );
}
