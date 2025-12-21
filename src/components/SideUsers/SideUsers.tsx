import "./style.css";
import React from "react";
import { Usersinterface } from "../../types/chat";
import { useUser } from "../../context/UserProvider";
import { client } from "../../api/client";

interface SideUsersProps {
  user: Usersinterface;
}

const SideUsers: React.FC<SideUsersProps> = ({ user }) => {
  const { resiver, setResiver, setMessages, setConversationId } = useUser();

  const getConversation = async (id: number, username: string) => {
    // update selected receiver
    setResiver({ id, username });

    try {
      const response = await client.post("/chat/getconversation", {
        userId: id,
        username,
      });  
      setMessages(response.data.data.messages);
      setConversationId(response.data.data.conversationId);
    } catch (error) {
      console.error("failed to load conversation", error);
    }
  };

  return (
    <li
      className={resiver?.id === user.id ? "selected" : ""}
      onClick={() => getConversation(user.id, user.username)}
    >
      <img src={user.image} alt={`${user.username}'s`} />
      <div>
        <h2 className={resiver?.id === user.id ? "selectedtext" : ""}>
          {user.username}
        </h2>
        <h3 className={resiver?.id === user.id ? "selectedtext" : ""}>
          <span className="status green" />
          {"online"}
        </h3>
      </div>
    </li>
  );
};

export default SideUsers;
