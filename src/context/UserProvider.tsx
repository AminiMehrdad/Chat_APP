import React, {
  createContext,
  useContext,
  useLayoutEffect,
  useState,
} from "react";
import { client } from "../api/client";
import { Usersinterface } from "../types/chat";

// ---- Types ----
type CurrentUser = {
  username?: string;
  phonenumber?: string;
  id?: number;
  image?: string;
};

type Receiver = {
  id?: number;
  username?: string;
};

type Message = {
  senderId?: number;
  message?: string;
};

// ---- Context type ----
interface UserContextValue {
  user: CurrentUser;
  users: Usersinterface[];
  resiver: Receiver;
  messages: Message[];
  conversationId?: number;

  setConversationId: React.Dispatch<React.SetStateAction<number | undefined>>;
  setResiver: React.Dispatch<React.SetStateAction<Receiver>>;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  setUsers: React.Dispatch<React.SetStateAction<Usersinterface[]>>;
  setUser: React.Dispatch<React.SetStateAction<CurrentUser>>;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<CurrentUser>({
    username: undefined,
    phonenumber: undefined,
    id: undefined,
    image: undefined,
  });

  const [users, setUsers] = useState<Usersinterface[]>([]);

  const [resiver, setResiver] = useState<Receiver>({
    username: "Admin",
    id: 20,
  });

  const [messages, setMessages] = useState<Message[]>([]);
  const [conversationId, setConversationId] = useState<number | undefined>(
    undefined
  );

  useLayoutEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await client.get("/users/all");
        setUsers(res.data.data as Usersinterface[]);
      } catch (error) {
        console.error("Failed to load Users:", error);
      }
    };

    const fetchUserInfo = async () => {
      try {
        const res = await client.get("/users/Info");
        setUser(res.data.data as CurrentUser);
      } catch (error) {
        console.error("Failed to load user Info", error);
      }
    };

    fetchUsers();
    fetchUserInfo();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        users,
        resiver,
        messages,
        conversationId,
        setResiver,
        setConversationId,
        setMessages,
        setUsers,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error("useUser must be used inside UserProvider");
  }
  return ctx;
}
