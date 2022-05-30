import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Context } from "./contexts/Context";
import "./styles/App.css";

import SourceLogo from "./assets/images/source.png";
import GithubLogo from "./assets/images/github.png";
import LinkedinLogo from "./assets/images/linkedin.png";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Regsiter from "./pages/Regsiter";
import NotFound from "./pages/NotFound";
import Taskbar from "./components/Taskbar";

export default function App() {
  const [user, setUser] = useState(null);
  const [chat, setChat] = useState(null);
  const [socket, setSocket] = useState(null);

  return (
    <div className="desktop">
      <div className="desktop-icon-container">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/mattmuroya/poet"
          className="desktop-icon github"
        >
          <img src={SourceLogo} alt="github" />
          <p>Source code</p>
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/mattmuroya/"
          className="desktop-icon github"
        >
          <img src={GithubLogo} alt="github" />
          <p>
            github.com/
            <br />
            mattmuroya
          </p>
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.linkedin.com/in/mattmuroya/"
          className="desktop-icon linkedin"
        >
          <img src={LinkedinLogo} alt="linkedin" />
          <p>
            linkedin.com/in/
            <br />
            mattmuroya
          </p>
        </a>
      </div>
      <Context.Provider
        value={{ user, setUser, chat, setChat, socket, setSocket }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Regsiter />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <Taskbar />
      </Context.Provider>
    </div>
  );
}
