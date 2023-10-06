// MainLayout.js
import { Routes, Route } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Chat from "./Chat";

function MainLayout() {
  return (
    <Routes>
      <Route path="/Chat-app/register" element={<Register />} />
      <Route path="/Chat-app/login" element={<Login />} />
      <Route path="/Chat-app/" element={<Chat />} />
    </Routes>
  );
}

export default MainLayout;
