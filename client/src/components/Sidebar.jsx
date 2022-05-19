import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export default function Sidebar() {
  const { user } = useContext(UserContext);

  return (
    <div className="sidebar">
      <ul className="tree-view contact-list">
        <li>
          <details open>
            <summary>Public Chat Rooms</summary>
            <ul>
              <li># General</li>
              <li># Music</li>
              <li># Movies</li>
              <li># Games</li>
              <li># Technology</li>
              <li># Web Design</li>
            </ul>
          </details>
        </li>
        <li>
          <details open>
            <summary>Online Users (6)</summary>
            <ul>
              <li>TheKid65</li>
              <li>lalib035</li>
              <li>N8DaBballPlaya</li>
              <li>TipDaddy78</li>
              <li>xXxSlayer808xXx</li>
              <li>iLuvNickCarter99</li>
            </ul>
          </details>
        </li>
        <li>
          <details>
            <summary>Offline Users (22)</summary>
            <ul>
              <li>TheKid65</li>
              <li>lalib035</li>
              <li>N8DaBballPlaya</li>
              <li>TipDaddy78</li>
              <li>xXxSlayer808xXx</li>
              <li>iLuvNickCarter99</li>
              <li>TheKid65</li>
              <li>lalib035</li>
              <li>N8DaBballPlaya</li>
              <li>TipDaddy78</li>
              <li>xXxSlayer808xXx</li>
              <li>iLuvNickCarter99</li>
              <li>TheKid65</li>
              <li>lalib035</li>
              <li>N8DaBballPlaya</li>
              <li>TipDaddy78</li>
              <li>xXxSlayer808xXx</li>
              <li>iLuvNickCarter99</li>
              <li>TheKid65</li>
              <li>lalib035</li>
              <li>N8DaBballPlaya</li>
              <li>TipDaddy78</li>
            </ul>
          </details>
        </li>
      </ul>
      <div className="status">
        <p>Hello, {user.username}!</p>
      </div>
    </div>
  );
}
