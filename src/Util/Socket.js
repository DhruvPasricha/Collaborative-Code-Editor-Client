import io from "socket.io-client";

const SOCKET_URL = "https://code-editor-2-f9my.onrender.com";

const DEFAULT_SOCKET_OPTIONS = {
  transports: ["websocket"],
  "connect timeout": 5000,
  "reconnection delay": 500,
  "reconnection limit": 5000,
  "max reconnection attempts": 10,
  reconnectionAttempts: 10,
  reconnection: true,
};

const createSocket = () => {
  const socketOptions = { ...DEFAULT_SOCKET_OPTIONS };
  const socket = io(SOCKET_URL, socketOptions);

  socket.on("connect_error", (err) => {
    console.error(`Connection error: ${err.message}`);
  });

  return socket;
};

export default createSocket;
