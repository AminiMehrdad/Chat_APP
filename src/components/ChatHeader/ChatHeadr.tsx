import "./style.css"

const ChatHeadr = () => {
    return (
        <>
        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_01.jpg" alt="userImage" />
                <div className="headrtext">
                    <h2>Chat with Vincent Porter</h2>
                    <h3>already 1902 messages</h3>
                </div>

                <button className="logout">Log out</button>
        </>
    );
}

export default ChatHeadr;
