import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context } from "../contexts/Context";

export const useAuth = () => {
  // const [savedUser, setSavedUser] = useState(null);
  const [userIsAuthorized, setUserIsAuthorized] = useState(null);
  const [authCheckCompleted, setAuthCheckCompleted] = useState(false);

  const { setUser } = useContext(Context);

  useEffect(() => {
    (async () => {
      const savedToken = localStorage.getItem("poet_auth_token");
      try {
        if (savedToken) {
          // check if token is valid; get newToken if yes, catch if no
          const res = await axios.post(
            "/api/auth",
            {},
            {
              headers: {
                Authorization: `bearer ${savedToken}`,
              },
            }
          );
          // get current user with newToken
          const { data } = await axios.get("/api/users/current", {
            headers: {
              Authorization: `bearer ${res.data.newToken}`,
              // for testing purposes
              // Authorization: "bearer BAD_TOKEN",
            },
          });
          if (!data) throw new Error("User not found.");
          localStorage.setItem("poet_auth_token", res.data.newToken);
          setUserIsAuthorized(true);
          setUser(data.user);
        }
      } catch (error) {
        localStorage.removeItem("poet_auth_token");
      } finally {
        setAuthCheckCompleted(true);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { userIsAuthorized, authCheckCompleted };
};
