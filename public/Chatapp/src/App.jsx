import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Chat from "./Chat";

import "./App.css";
import MainLayout from "./pages/Mainlayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path=" /Chat-app/register" element={<Register />} />
        <Route path=" /Chat-app/login" element={<Login />} />
        <Route path=" /Chat-app/" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
