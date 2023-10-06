import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import MainLayout from "./pages/Mainlayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Chat-app/*" element={<MainLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
