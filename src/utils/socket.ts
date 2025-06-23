import { io, Socket } from "socket.io-client";

// URL của backend server (dùng đúng port backend đang chạy)
const SOCKET_SERVER_URL =
  import.meta.env.VITE_SOCKET_SERVER_URL ?? "http://localhost:4000";

let socket: Socket;

export const connectSocket = () => {
  if (!socket) {
    socket = io(SOCKET_SERVER_URL, {
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      console.log("✅ Connected to socket server");
    });

    socket.on("disconnect", () => {
      console.log("❌ Disconnected from socket server");
    });
  }

  return socket;
};

export const getSocket = (): Socket => {
  if (!socket)
    throw new Error("Socket not initialized. Call connectSocket() first.");
  return socket;
};
