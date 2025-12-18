import ChatMain from "../../components/ChatMain/ChatMain";
import Side from "../../components/side/Side";
import { UserProvider } from "../../context/UserProvider";
import "./style.css"

const ChatPage = () => {
    return (
        <UserProvider>
            <>
                <ChatMain />
                <Side />
            </>
        </UserProvider>
    );
}

export default ChatPage;
