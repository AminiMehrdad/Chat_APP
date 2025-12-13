import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp"; 
import ChatPage from "./pages/chatPage/ChatPage"
import "./styles/App.css"
import { AuthProvider } from "./context/AuthProvider";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import Admin from "./pages/Admin/Admin";


const App = () => {
     return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<ChatPage />} />
            <Route path="/chat" element={<ChatPage />} />
          </Route>

          <Route element={<ProtectedRoute requiredRole="admin" />}>
            <Route path="/admin" element={<Admin />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
