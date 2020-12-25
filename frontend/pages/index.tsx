import Head from 'next/head'
import styles from '../styles/Home.module.css'
import io from 'socket.io-client';
import { useRef, useEffect, useState, ChangeEvent } from "react"

export default function Home() {
  const inputRef = useRef()
  const [socket, setSocket] = useState<SocketIOClient.Socket | undefined>(undefined)
  const [roomInputVal, setRoomInputVal] = useState("testRoom")

  useEffect(() => {
    const socket = io("http://localhost:5000");
    socket.on("connect", () => {
      const idP = document.createElement("p")
      idP.innerText = socket.id
      document.querySelector(".chat").appendChild(idP)
    })
    setSocket(socket)
  }, [])

  const joinRoom = () => {
    socket.emit("join room", roomInputVal)
  }

  useEffect(() => {
    if (socket) {
      joinRoom()
      socket.emit("update all", roomInputVal)
      socket.on("update all", (data) => {
        const idP = document.createElement("p")
        idP.innerText = data
        document.querySelector(".chat").appendChild(idP)
      })
      socket.on("user left", (data) => {
        const idP = document.createElement("p")
        idP.innerText = data
        document.querySelector(".chat").appendChild(idP)
      })
    }
  }, [socket])



  const updateRoomVal = (event: ChangeEvent<HTMLInputElement>) => {
    setRoomInputVal(event.target.value)
  }

  return (
    <div >
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <input type="text" id="roomInput" value={roomInputVal} onChange={updateRoomVal} ref={inputRef} />
      <button onClick={joinRoom}>Join Room</button>
      <div className={"chat"}></div>
    </div >
  )
}
