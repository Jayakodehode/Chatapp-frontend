import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import SetAvatar from "./pages/SetAvatar";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Chatapp-frontend/register" element={<Register />} />
        <Route path="/Chatapp-frontend/login" element={<Login />} />
        <Route path="/Chatapp-frontend/setAvatar" element={<SetAvatar />} />
        <Route path="/Chatapp-frontend/" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
