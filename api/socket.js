import { Server } from "socket.io";

export default function handler(req, res) {
  if (!res.socket.server.io) {
    console.log("Inicializando Socket.IO...");
    const io = new Server(res.socket.server);

    const salas = new Set();

    io.on("connection", (socket) => {
      console.log("Novo usuário conectado");

      socket.on("criarSala", (nomeSala) => {
        if (salas.has(nomeSala)) {
          socket.emit("erro", "Sala já existe!");
        } else {
          salas.add(nomeSala);
          socket.emit("salaCriada", `Sala "${nomeSala}" criada com sucesso!`);
        }
      });
    });

    res.socket.server.io = io;
  }
  res.end();
}
