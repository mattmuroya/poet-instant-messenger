import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../contexts/Context";
import { v4 as uuidv4 } from "uuid";

export default function ChatContainer() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const { user, chat } = useContext(Context);

  const scrollRef = useRef();

  useEffect(() => {
    (async () => {
      if (!chat) return;
      try {
        const { data } = await axios.get(`/api/messages/${chat.id}`, {
          headers: {
            Authorization: `bearer ${localStorage.getItem("poet_auth_token")}`,
          },
        });
        setMessages(
          data.messages.sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1))
        );
      } catch (error) {
        setMessages([]);
        console.log(error);
      }
    })();
  }, [chat]);

  useEffect(() => {
    // ?. is optional chaining
    // returns undef instead of error if no scrollRef.current
    scrollRef.current?.scrollIntoView();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      // update react state before posting message to server for faster UX
      // need to implement elegant error handling if post req fails after sending
      setMessages([
        ...messages,
        { id: uuidv4(), sender: user, recipient: chat, text: message },
      ]);
      setMessage("");
      await axios.post(
        "/api/messages",
        {
          recipient: chat.id,
          text: message,
        },
        {
          headers: {
            Authorization: `bearer ${localStorage.getItem("poet_auth_token")}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleEnterKey = (e) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      handleSendMessage(e);
    }
  };

  return (
    <div className="chat-container">
      <div className="message-pane">
        <div>
          {!chat
            ? "Select a contact from your Friends list to begin chatting!"
            : messages.map((message) => {
                return (
                  <p ref={scrollRef} key={message.id}>
                    <span
                      className={
                        message.sender.id === user.id
                          ? "sender-name"
                          : "recipient-name"
                      }
                    >
                      {message.sender.username}:
                    </span>{" "}
                    {message.text}
                  </p>
                );
              })}
        </div>
      </div>
      <form className="message-input" onSubmit={(e) => handleSendMessage(e)}>
        <textarea
          placeholder="Type your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => handleEnterKey(e)}
          disabled={!chat ? true : false}
        />
        <button type="submit" disabled={!chat ? true : false}>
          Send
        </button>
      </form>
    </div>
  );
}
