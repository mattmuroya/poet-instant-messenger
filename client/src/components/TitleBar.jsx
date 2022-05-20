import { useLocation, useNavigate } from "react-router-dom";

export default function TitleBar({ title }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (
      location.pathname === "/" &&
      window.confirm("are you sure you want to log out?")
    ) {
      localStorage.removeItem("poet_user");
      navigate("/login");
    }
  };

  return (
    <div className="title-bar">
      <div className="title-bar-text">{title} - Poet Instant Messenger</div>
      <div className="title-bar-controls">
        <button aria-label="Close" onClick={handleLogout}></button>
      </div>
    </div>
  );
}
