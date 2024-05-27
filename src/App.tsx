// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/LogIn";
import ChatRoom from "./components/ChatRoom";
import CreateRoom from "./components/CreateRoom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebaseConfig";
import './components/Login.css'
import './components/Chatroom.css'
import './components/Createroom.css'

const App: React.FC = () => {
  const [user] = useAuthState(auth);

  return (
    <Router>
      <div>
        {user ? (
          <Routes>
            <Route path="/" element={<CreateRoom />} />
            <Route path="/chatroom/:id" element={<ChatRoom />} />
          </Routes>
        ) : (
          <Login />
        )}
      </div>
    </Router>
  );
};

export default App;
