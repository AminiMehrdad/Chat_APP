import { Link } from "react-router";

function Chat() {
  return (
    <div>
      <h1>Chat Page</h1>
      <p>This is the main chat page.</p>

      {/* example link to user chat */}
      <Link to="/userchat">Go to User Chat</Link>
    </div>
  );
}

export default Chat;
