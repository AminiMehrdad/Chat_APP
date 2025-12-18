import { createContext, useContext, useEffect, useLayoutEffect, useState } from "react";
import { client } from "../api/client";

interface UserContextValue {
    user: {
        username: string | undefined;
        phonenumber: string | undefined;
        id: number | undefined;
        image: string | undefined;
    };
    users: object | undefined;
    resiver: {
        id: number | undefined;
        username: string | undefined;
    };
    setResiver:  React.Dispatch<React.SetStateAction<{
        id: number;
        username: string;
    }>>
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState({
        username: undefined,
        phonenumber: undefined,
        id: undefined,
        image: undefined,
    });


    const [users, setUsers] = useState([]);

    const [resiver, setResiver] = useState({
        username: "Admin",
        id: 20
    }
    )

    useLayoutEffect(() => {
        const fetchUsers = async () => {
            try {
                const { data } = await client.get("/users/all");
                setUsers(data.data)
            } catch (error) {
                console.error("Failed to load Users:", error)
            }
        };
        fetchUsers();

        const fetchUserInfo = async () => {
            try {
                const { data } = await client.get("/users/Info");
                setUser(data.data)
            } catch (error) {
                console.error("Failed to load user Info", error)
            }
        }
        fetchUserInfo()
    }, [])

    return (
        <UserContext.Provider value={{ user, users, resiver, setResiver }}>
            {children}
        </UserContext.Provider>
    )

}

export function useUser() {
    const ctx = useContext(UserContext)
    if (!ctx) {
        throw new Error("useUser must be used inside UserProvider")
    }
    return ctx
}
