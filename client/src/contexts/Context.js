import { createContext } from "react";

export const Context = createContext({
  user: null,
  setUser: () => {},

  chat: null,
  setChat: () => {},

  socket: null,
  setSocket: () => {},
});
