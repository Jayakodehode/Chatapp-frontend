// MainLayout.js
import { Routes, Route } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Chat from "./Chat";

function MainLayout() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Chat />} />
    </Routes>
  );
}

export default MainLayout;
