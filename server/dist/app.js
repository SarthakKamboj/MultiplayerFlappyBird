"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const app = express_1.default();
const PORT = 5000;
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:3001",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    const socketId = socket.id;
    console.log(`the socket id is ${socketId}`);
    socket.on("name", (data) => {
        console.log(data);
    });
    socket.on("disconnect", () => {
        console.log(`user ${socketId} has disconnected`);
    });
});
server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
//# sourceMappingURL=app.js.map