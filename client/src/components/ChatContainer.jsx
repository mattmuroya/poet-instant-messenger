import { useState } from "react";

export default function ChatContainer() {
  const [message, setMessage] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    alert("to implement: send message", { message });
  };

  return (
    <div className="chat-container">
      <div className="message-window">hello, world!</div>
      <form className="message-form" onSubmit={(e) => handleSendMessage(e)}>
        <textarea placeholder="Type your message here..."></textarea>
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
