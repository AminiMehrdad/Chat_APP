import "./style.css"
interface HeaderUserProps {
    image:string,
    username:string,
    phonenumber:string
}

const ChatHeadr: React.FC<HeaderUserProps> = ({image, username, phonenumber}) => {
    
    return (
        <>
        <img src={image} alt="userImage" />
                <div className="headrtext">
                    <h2>{username}</h2>
                    <h3>{phonenumber}</h3>
                </div>

                <button className="logout">Log out</button>
        </>
    );
}

export default ChatHeadr;
