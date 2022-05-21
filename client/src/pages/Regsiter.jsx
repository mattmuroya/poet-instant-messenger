import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

import windowsLogo from "../assets/images/windows-logo.png";
import TitleBar from "../components/TitleBar";
import RegistrationForm from "../components/RegistrationForm";

export default function Regsiter() {
  const navigate = useNavigate();

  const { userIsAuthorized, authCheckCompleted } = useAuth();

  useEffect(() => {
    if (userIsAuthorized) navigate("/");
  }, [userIsAuthorized, navigate]);

  return (
    authCheckCompleted &&
    !userIsAuthorized && (
      <div className="window registration-window">
        <TitleBar title="Register" />
        <div className="window-body">
          <img src={windowsLogo} alt="register" />
          <RegistrationForm />
        </div>
      </div>
    )
  );
}
