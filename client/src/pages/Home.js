import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { useAuth } from "../hooks/useAuth";

export default function Home() {
  const navigate = useNavigate();

  const { user, setUser } = useContext(UserContext);

  const { savedUser, authCheckCompleted } = useAuth();

  useEffect(() => {
    if (authCheckCompleted && !savedUser) navigate("/login");
  }, [savedUser, authCheckCompleted, navigate]);

  return authCheckCompleted && savedUser && <div>Home</div>;
}
