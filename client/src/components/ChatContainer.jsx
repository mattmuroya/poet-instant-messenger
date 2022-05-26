import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Context } from "../contexts/Context";

export default function ChatContainer() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const { chat } = useContext(Context);

  useEffect(() => {
    (async () => {
      if (!chat) return;
      try {
        const { data } = await axios.get(`/api/messages/${chat.id}`, {
          headers: {
            Authorization: `bearer ${localStorage.getItem("poet_auth_token")}`,
          },
        });
        // console.log(data.messages);
        setMessages(data.messages);
      } catch (error) {
        setMessages([]);
        console.log(error);
      }
    })();
  }, [chat]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    alert("to implement: send message", message);
  };

  const handleEnterKey = (e) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      setMessage("");
      alert(message);
    }
  };

  return (
    <div className="chat-container">
      <div className="message-pane">
        <div>
          {messages.map((message) => {
            return <p key={message.id}>{message.text}</p>;
          })}
        </div>
      </div>
      <form className="message-input" onSubmit={(e) => handleSendMessage(e)}>
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
