import {  useLayoutEffect, useState } from "react";
import ChatHeadr from "../ChatHeader/ChatHeadr";
import "./style.css";
import Massages from "../Massages/Massages";
import ChatFooter from "../ChatFooter/ChatFooter";
import { client } from "../../api/client";

const ChatMain = () => {
    const [messages, setMessages] = useState([]);
    const [user, setUser] = useState({
        id:"",
        image:"",
        username:"",
        phonenumber:""
    })

    useLayoutEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const {data} = await client.get("/users/Info");
                setUser(data.data)
            } catch (error) {
                console.error("Failed to load user Info", error)
            }
        };
        fetchUserInfo()
        fetch("/mock-data/massage.data.json")
            .then(res => res.json())
            .then(data => {
                setMessages(data);
            })
            .catch(err => console.error("Error loading json:", err));
    }, []);
    
    return (
        <main>
            <header>
                <ChatHeadr image={user.image} username={user.username} phonenumber={user.phonenumber} />
            </header>

            <ul id="chat">
                {messages.map((msg, index) => 
                    <Massages messages={msg} key={index} />
                )}
            </ul>

            <footer>
                <ChatFooter />
            </footer>
        </main>
    );
};

export default ChatMain;
