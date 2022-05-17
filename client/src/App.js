import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContext } from "./contexts/UserContext";

import styled from "styled-components";
import "./App.css";
import "98.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Regsiter from "./pages/Regsiter";
import NotFound from "./pages/NotFound";
import Taskbar from "./components/Taskbar";

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <Desktop>
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
    </Desktop>
  );
}

const Desktop = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #008080;
  font-size: 20px;
`;
