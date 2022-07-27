import { io } from "./http";
interface UserMessage {
    username: string
    content: string
}

io.on("connection", socket => {
    socket.on("chat message", (msg: UserMessage) => {
        io.emit("chat message", msg);
    });
});