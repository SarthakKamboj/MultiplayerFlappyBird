import Head from 'next/head'
import styles from '../styles/Home.module.css'
import io from 'socket.io-client';
import { useEffect, useState } from "react"

export default function Home() {

  const [socket, setSocket] = useState<SocketIOClient.Socket | undefined>(undefined)
  useEffect(() => {
    const socket = io("http://localhost:5000");
    socket.on("connect", () => {
      console.log(socket.id)
      console.log("connected")
      const idP = document.createElement("p")
      idP.innerText = socket.id
      document.querySelector(".chat").appendChild(idP)
    })
    setSocket(socket)
  }, [])

  useEffect(() => {
    if (socket) {
      socket.emit("name", "my name is sarthak")
    }
  }, [socket])


  return (
    <div >
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={"chat"}></div>
    </div >
  )
}
