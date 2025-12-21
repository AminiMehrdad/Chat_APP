import { io } from "socket.io-client";

export const socket = io(
  `http://localhost:${process.env.REACT_APP_SERVERPORT}`
);
