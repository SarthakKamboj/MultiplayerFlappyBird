import express from "express"
import http from 'http'
import { Server, Socket } from "socket.io"

const app = express()
const PORT = 5000


const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3001",
        methods: ["GET", "POST"]
    }
})

io.on("connection", (socket: Socket) => {
    const socketId = socket.id

    console.log(`the socket id is ${socketId}`)

    socket.on("name", (data) => {
        console.log(data)
    })

    socket.on("disconnect", () => {
        console.log(`user ${socketId} has disconnected`)
    })
})


server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})
