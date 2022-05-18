import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";

export const useAuth = () => {
  const [savedUser, setSavedUser] = useState(null);
  const [authCheckCompleted, setAuthCheckCompleted] = useState(false);

  const { setUser } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      const lastSavedUser = JSON.parse(localStorage.getItem("poet_user"));
      try {
        if (lastSavedUser) {
          const { data } = await axios.post("/api/auth", lastSavedUser, {
            headers: {
              Authorization: `bearer ${lastSavedUser.token}`,
              // Authorization: "bearer BADTOKEN",
            },
          });
          localStorage.setItem("poet_user", JSON.stringify(data));
          setSavedUser(data);
          setUser(data);
        }
      } catch (error) {
        console.error(error);
        localStorage.removeItem("poet_user");
      } finally {
        setAuthCheckCompleted(true);
      }
    })();
  }, []);

  return { savedUser, authCheckCompleted };
};
