import { useUser } from "../../context/UserProvider";
import "./style.css"


const ChatHeadr: React.FC = () => {
    const {user} = useUser()
    return (
        <>
        <img src={user.image} alt="userImage" />
                <div className="headrtext">
                    <h2>{user.username}</h2>
                    <h3>{user.phonenumber}</h3>
                </div>

                <button className="logout">Log out</button>
        </>
    );
}

export default ChatHeadr;
