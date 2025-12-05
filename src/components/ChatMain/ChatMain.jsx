import { useEffect, useState } from "react";
import ChatHeadr from "../ChatHeader";
import "./style.css";
import Massages from "../Massages";
import ChatFooter from "../ChatFooter";

const ChatMain = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
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
                <ChatHeadr />
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
