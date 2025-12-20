import { useEffect, useLayoutEffect, useState } from "react";
import ChatHeadr from "../ChatHeader/ChatHeadr";
import "./style.css";
import Massages from "../Massages/Massages";
import ChatFooter from "../ChatFooter/ChatFooter";
import { client } from "../../api/client";
import { socket } from "../../api/socket";
import { useUser } from "../../context/UserProvider";

interface Message {
  sender: string;
  resiver: string;
  date: number;
  text: string;
  user: {
    username: string;
    clock: string;
    date: string;
    massage: string;
  };
}

const ChatMain = () => {
  const {
    user,
    users,
    resiver,
    conversationId,
    setResiver,
    messages,
    setMessages,
  } = useUser();
  const [text, setText] = useState("");

  useEffect(() => {
    socket.on("newMessage", (massage) => {
      setMessages((prev) => [...prev, massage]);
    });
    return () => {
      socket.off("newMessage");
    };
  }, []);

  const sendMessage = () => {
    socket.emit("sendMessage", {
      conversationId,
      senderId: user.id,
      text,
    });
    setText("");
  };

  return (
    <main>
      <header>
        <ChatHeadr />
      </header>

      <ul id="chat">
        {messages.map((msg, index) => (
          <Massages messages={msg} key={index} />
        ))}
      </ul>

      <footer>
        <ChatFooter text={text} setText={setText} onSend={sendMessage} />
      </footer>
    </main>
  );
};

export default ChatMain;
