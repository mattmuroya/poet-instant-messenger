import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

export default function Home() {
  const navigate = useNavigate();

  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  return (
    user && (
      <div className="window home-window">
        <div className="title-bar">
          <div className="title-bar-text">Home - Poet Instant Messenger</div>
          <div className="title-bar-controls">
            <button aria-label="Close"></button>
          </div>
        </div>
        <div className="window-body">
          <nav className="sidebar">
            <ul className="tree-view">
              <li>Table of Contents</li>
              <li>What is web development?</li>
              <li>
                CSS
                <ul>
                  <li>Selectors</li>
                  <li>Specificity</li>
                  <li>Properties</li>
                </ul>
              </li>
              <li>
                <details open>
                  <summary>JavaScript</summary>
                  <ul>
                    <li>Avoid at all costs</li>
                    <li>
                      <details>
                        <summary>Unless</summary>
                        <ul>
                          <li>Avoid</li>
                          <li>
                            <details>
                              <summary>At</summary>
                              <ul>
                                <li>Avoid</li>
                                <li>At</li>
                                <li>All</li>
                                <li>Cost</li>
                              </ul>
                            </details>
                          </li>
                          <li>All</li>
                          <li>Cost</li>
                        </ul>
                      </details>
                    </li>
                  </ul>
                </details>
              </li>
              <li>HTML</li>
              <li>Special Thanks</li>
            </ul>
          </nav>
        </div>
      </div>
    )
  );
}
