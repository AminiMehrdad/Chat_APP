import "./style.css"

const ChatFooter = () => {
    return (
            <div className="chat-input-container">
                <textarea
                    placeholder="Message"
                    // value={message}
                    // onChange={(e) => setMessage(e.target.value)}
                    // onKeyDown={(e) => {
                    //     if (e.key === "Enter" && !e.shiftKey) {
                    //         e.preventDefault();
                    //         handleSend();
                    //     }
                    // }}
                />
                <div className="iContiner">
                <i
                    className="fa fa-paperclip sender" style={{fontSize:"24px",color:"gray"}}
                    // onClick={() => console.log("Attach file")}
                ></i>
                <i className="fa fa-paper-plane sender" style={{fontSize:"24px"}}></i>

                </div>

                </div>
            );
}

            export default ChatFooter;
