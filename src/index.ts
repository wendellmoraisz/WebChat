import express from "express";
import { Server } from "socket.io";
import http from "http";
import path from "path";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/", (req, res) => {
    res.send("ola");
});

io.on("connection", socket => {
    socket.on("chat message", msg => {
        io.emit("chat message", msg);
    });
}); 

server.listen(3000, () => {
    console.log("Server is running at http://localhost:3000");
});