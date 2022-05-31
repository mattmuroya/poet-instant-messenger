import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../contexts/Context";
import { v4 as uuidv4 } from "uuid";

export default function ChatContainer({ chatListExpanded }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [otherUserTyping, setOtherUserTyping] = useState(false);

  const { user, chat, socket } = useContext(Context);

  const scrollRef = useRef();

  useEffect(() => {
    (async () => {
      setMessages([]);
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
    if (socket) {
      message !== ""
        ? socket.emit("typing", { typing: true, sender: user, recipient: chat })
        : // delay so it doesn't emit "not typing" right when the input is cleared
          // as you send a message. The sendMessage function will emit the "not typing"
          // after it's done sending message data. Makes it less jarring for recipient
          setTimeout(() => {
            socket.emit("typing", {
              typing: false,
              sender: user,
              recipient: chat,
            });
          }, 200);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  useEffect(() => {
    // ?. is optional chaining
    // returns undef instead of error if no scrollRef.current
    scrollRef.current?.scrollIntoView();
  }, [messages, otherUserTyping]);

  useEffect(() => {
    if (socket) socket.on("chat_typing", updateChatTyping);
    return () => {
      if (socket) socket.off("chat_typing", updateChatTyping);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, chat]);

  const updateChatTyping = (data) => {
    if (data.sender.id === chat.id) setOtherUserTyping(data.typing);
  };

  useEffect(() => {
    if (socket) socket.on("receive_message", updateReceivedMessage);
    return () => {
      if (socket) socket.off("receive_message", updateReceivedMessage);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, chat]);

  const updateReceivedMessage = (receivedMessage) => {
    // for some reason the spread operator was causing
    // the Messages state to revert to an empty array.
    if (chat && receivedMessage.sender.id === chat.id) {
      setMessages((prevMessages) => prevMessages.concat(receivedMessage));
      setOtherUserTyping(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      // update react state before posting message to server for faster UX
      // need to implement elegant error handling if post req fails after sending
      if (message === "") throw new Error("Message body cannot be empty.");
      setMessages([
        ...messages,
        { id: uuidv4(), sender: user, recipient: chat, text: message },
      ]);
      setMessage("");
      const { data } = await axios.post(
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
      socket.emit("send_message", data.message);
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
      {/* <div> */}
      <div className="message-pane">
        {!chat
          ? // ? "Select a contact from your Friends list to begin chatting!"
            ""
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
        {chat && !chatListExpanded && otherUserTyping && (
          <div ref={scrollRef} className="typing-indicator">
            {chat.username} is typing...
          </div>
        )}
      </div>
      {/* </div> */}
      <form className="message-input" onSubmit={(e) => handleSendMessage(e)}>
        <textarea
          placeholder={
            user.username === "guest"
              ? "You are currently logged in as a Guest. To send invites and chat with friends, please register as a new user!"
              : "Type your message here..."
          }
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => handleEnterKey(e)}
          // disabled={!chat ? true : false}
          disabled={user.username === "guest" ? true : false}
        />
        <button
          type="submit"
          // disabled={!chat ? true : false}
          disabled={user.username === "guest" ? true : false}
        >
          Send
        </button>
      </form>
    </div>
  );
}
