import fullscreen from "fullscreen"
import { useEffect, useState } from "react"
import { World, Engine, Bodies, Render, Runner } from "matter-js"

const Game = () => {
    const [engine, setEngine] = useState<Engine>()
    const [render, setRender] = useState<Render>()

    useEffect(() => {
        // console.log(fullscreen.available())
        const canvas = document.getElementById("canvas")
        const fs = fullscreen(canvas)
        canvas.addEventListener("click", () => {
            if (fs.target()) {
                fs.release()
            }
            fs.request()
        })
        const newEngine = Engine.create()
        const newRender = Render.create({
            element: canvas,
            engine: newEngine,
        })
        setEngine(newEngine)
        setRender(newRender)
    }, [])

    useEffect(() => {
        if (engine && render) {
            const circle = Bodies.circle(0, 0, 10)
            // const rectangle = Bodies.rectangle(0, 20, 10, 10)
            World.addBody(engine.world, circle)
            // World.addBody(engine.world, rectangle)
            // Render.run(engine.render)
            Engine.run(engine)
            // const gameLoop = setInterval(() => {
            // Engine.update(engine, 16.67)
            // console.log(circle.position)
            // }, 16.67)
            Render.run(render)
        }
    }, [engine, render])

    return (
        <>
            <div>Hello World</div>
            <p>this is the game</p>
            <div id={"canvas"} style={{ border: '2px solid blue', background: 'white' }} />
        </>
    )
}

export default Game