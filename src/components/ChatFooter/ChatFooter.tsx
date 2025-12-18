import "./style.css"

interface ChatFooterProps {
    text: string;
    setText: (value: string) => void;
    onSend: () => void;
}

const ChatFooter = ({ text, setText, onSend }: ChatFooterProps) => {
    return (
        <div className="chat-input-container">
            <textarea
                placeholder="Message"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <div className="iContiner">
                    <i
                        className="fa fa-paperclip sender" style={{ fontSize: "24px", color: "gray" }}
                        
                    ></i>
                <button onClick={onSend}>

                <i className="fa fa-paper-plane sender" style={{ fontSize: "24px" }}></i>
                </button>

            </div>

        </div>
    );
}

export default ChatFooter;
