import express from "express"
import http from 'http'
import { Server, Socket } from "socket.io"

const app = express()
const PORT = 5000


const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})



io.on("connection", (socket: Socket) => {

    const socketId = socket.id

    console.log(`the socket id is ${socketId}`)

    socket.on("hi", (msg) => {
        console.log(msg)
        socket.emit("hi", "hi from server");
    })

    socket.on("update all", (roomId: string) => {
        console.log(roomId)
        if (roomId) {
            // socket.to(roomId).emit("update all", `send to all users in room ${roomId}`)
            io.to(roomId).emit("update all", `send to all users in room ${roomId}`)
        } else {
            socket.broadcast.emit("update all", "send to all users")
        }
    })

    socket.on("disconnecting", () => {
        socket.rooms.forEach(roomId => {
            if (roomId === "testRoom") {
                io.to(roomId).emit("user left", `user ${socket.id} has left`)
            }
        })
    })

    socket.on("join room", (roomId) => {
        socket.join(roomId)
    })

    socket.on("disconnect", () => {
        console.log(`user ${socketId} has disconnected`)
    })
})


server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})
