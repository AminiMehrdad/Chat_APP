import { useEffect, useLayoutEffect, useState } from "react";
import ChatHeadr from "../ChatHeader/ChatHeadr";
import "./style.css";
import Massages from "../Massages/Massages";
import ChatFooter from "../ChatFooter/ChatFooter";
import { client } from "../../api/client";
import { socket } from "../../api/socket";
import { useUser } from "../../context/UserProvider";


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

  console.log(conversationId);
  
  useEffect(() => {
    socket.on("newMessage", (massage) => {
      setMessages((prev) => [...prev, massage]);
    });
    return () => {
      socket.off("newMessage");
    };
  }, []);

  useEffect(() => {
  if (!conversationId) return;

  socket.emit("joinConversation", conversationId);

  return () => {
    socket.emit("leaveConversation", conversationId); 
  };
}, [conversationId]);

  const sendMessage = () => {
    socket.emit("sendMessage", {
      conversationId,
      senderId: user.id,
      text,
    });
    setText("");
  };

  console.log(messages);
  

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
