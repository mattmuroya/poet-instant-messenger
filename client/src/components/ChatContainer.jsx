import { useRef, useState } from "react";

export default function ChatContainer() {
  const [message, setMessage] = useState("");

  const messageInput = useRef();

  const handleSendMessage = (e) => {
    e.preventDefault();
    alert("to implement: send message", message);
  };

  const handleEnterKey = (e) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      // messageInput.submit();
      setMessage("");
      alert(message);
    }
  };

  return (
    <div className="chat-container">
      <div className="message-pane">
        <p>hello</p>
        <p>hey wazup!</p>
        <p>nm just chillin w josh. we got pizza</p>
        <p>dude that's so cool. what kind</p>
        <p>pepperoni obvs. tha best</p>
        <p>you goin to the game saturday?</p>
        <p>yes! I gotta find a ride tho</p>
        <p>My mom can probly pic u up. we're gonna get lunch if u wanna come</p>
        <p>whoa that would be awesome! thx</p>
        <p>np see u then</p>
        <p>kk!</p>
      </div>
      <form
        ref={messageInput}
        className="message-input"
        onSubmit={(e) => handleSendMessage(e)}
      >
        <textarea
          placeholder="Type your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => handleEnterKey(e)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
