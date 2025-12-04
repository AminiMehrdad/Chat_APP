// import { Link } from "react-router";
import Side from "../../components/side"
import Conversation from "../../components/conversation"
import "./style.css"

function Chat() {
  return (  
     <div className="container app">
      <div className="row app-one">
        <Side />
        <Conversation />
      </div>
    </div>  
  );
}

export default Chat;
