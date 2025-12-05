import { Route, Routes } from "react-router";
import ChatPage from "./pages/chatPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp"
import "./styles/App.css"


const App = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/" element={<Login/>} />
            <Route path="*" element={<h1>Not Found</h1>} />
        </Routes> 
    );
}

export default App;
