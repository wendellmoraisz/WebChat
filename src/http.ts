import express from "express";
import http from "http";
import path from "path";
import { Server } from "socket.io";

const app = express();
const serverHttp = http.createServer(app);

const io = new Server(serverHttp);

app.use(express.static(path.join(__dirname, "..", "public")));

export { io, serverHttp };