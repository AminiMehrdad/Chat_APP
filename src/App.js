import { Link, Route, Routes } from "react-router";
import Login from "./pages/loginPage";
import Chat from "./pages/chatPage";
import UserChat from "./pages/userChatPage";;

function App() {
  return (
    <>
     
      {/* <nav>
        <Link to="/login">Login</Link> | <Link to="/chat">Chat</Link> |{" "}
        <Link to="/userchat">User Chat</Link>
      </nav> */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/userchat" element={<UserChat />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
