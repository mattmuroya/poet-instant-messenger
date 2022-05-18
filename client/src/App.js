import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContext } from "./contexts/UserContext";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Regsiter from "./pages/Regsiter";
import NotFound from "./pages/NotFound";
import Taskbar from "./components/Taskbar";

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="desktop">
      <UserContext.Provider value={{ user, setUser }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Regsiter />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <Taskbar />
      </UserContext.Provider>
    </div>
  );
}
