import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export default function ContactsContainer({ innerRef, mobile }) {
  const { user } = useContext(UserContext);

  return (
    <div
      ref={innerRef}
      className={`contacts-container ${mobile ? "collapsed" : ""}`}
    >
      <ul className="tree-view contact-list">
        <li>
          <strong style={{ color: "purple" }}>
            &#10024; Public Chat Rooms &#10024;
          </strong>
          <ul>
            <li># General</li>
            <li># Music</li>
            <li># Movies</li>
            <li># Games</li>
            <li># Technology</li>
            <li># Web Design</li>
          </ul>
        </li>
        <li>
          <strong style={{ color: "purple" }}>
            &#10024;My Friends &#10024;
          </strong>
          <ul>
            <li>
              <details open>
                <summary>Online (3)</summary>
                <ul>
                  <li>lalib035</li>
                  <li>N8DaBballPlaya</li>
                  <li>TipDaddy78</li>
                </ul>
              </details>
            </li>
            <li>
              <details open>
                <summary>Offline (4)</summary>
                <ul>
                  <li>p0k3m0n-m45t3r</li>
                  <li>lifesAboxOchocolates</li>
                  <li>xXxNIRVANAxXx</li>
                  <li>iLuvNickCarter99</li>
                </ul>
              </details>
            </li>
            <li>
              <details open>
                <summary>Invites Received (1)</summary>
                <ul>
                  <li>amell013 accept reject</li>
                </ul>
              </details>
            </li>
            <li>
              <details open>
                <summary>Invites Sent (2)</summary>
                <ul>
                  <li>TheKid65 cancel</li>
                  <li>ZeldaLuvvr94 cancel</li>
                </ul>
              </details>
            </li>
          </ul>
        </li>
        <li>
          <strong style={{ color: "purple" }}>
            &#10024; Find Friends &#10024;
          </strong>
          <ul>
            <li>
              <details open>
                <summary>All Users</summary>
                <ul>
                  <input
                    style={{ margin: "4px 0px" }}
                    placeholder="Search..."
                  />
                  <li></li>
                  <li>justintimberlake</li>
                  <li>justintimberlake</li>
                  <li>justintimberlake</li>
                  <li>justintimberlake</li>
                  <li>justintimberlake</li>
                  <li>justintimberlake</li>
                  <li>justintimberlake</li>
                  <li>justintimberlake</li>
                  <li>justintimberlake</li>
                  <li>justintimberlake</li>
                  <li>justintimberlake</li>
                  <li>justintimberlake</li>
                  <li>justintimberlake</li>
                  <li>justintimberlake</li>
                  <li>justintimberlake</li>
                  <li>justintimberlake</li>
                  <li>justintimberlake</li>
                  <li>justintimberlake</li>
                  <li>justintimberlake</li>
                  <li>justintimberlake</li>
                  <li>justintimberlake</li>
                  <li>justintimberlake</li>
                  <li>justintimberlake</li>
                  <li>justintimberlake</li>
                  <li>justintimberlake</li>
                  <li>justintimberlake</li>
                  <li>justintimberlake</li>
                </ul>
              </details>
            </li>
          </ul>
        </li>
      </ul>
      <div className="status">
        <p>Hello, {user.username}!</p>
      </div>
    </div>
  );
}
