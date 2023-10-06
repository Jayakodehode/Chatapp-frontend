import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import "./App.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Chat-app/register" element={<Register />} />
        <Route path="/Chat-app/login" element={<Login />} />
        <Route path="/Chat-app/" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
