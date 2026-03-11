const amqp = require("amqplib")
const express = require("express")

const app = express()

const PORT = process.env.PORT || 8080;

app.use(express.json())

let chennal;

let connection;

const queue = "order"

app.post("/send", (req, res) => {
    const msg = req.body.message
    if (!msg) {
        return res.status(400).send({ error: "Mesage is required" })
    }
    if (!chennal) {
        return res.status(400).send({ error: "Chennal is not establish" })
    }

    try {
        chennal.sendToQueue(queue, Buffer.from(msg))
        console.log(`[X] Sent to queue: ${msg}`)
    }
    catch (err) {
        console.log(`Failed to sent message to queue`, err)
        res.send(500).send({err:`Failed to send message to queue.`,msg})

    }

})

async function connectAndStartUp() {

    try {
        console.log("trying to connect")
        connection = await amqp.connect("amqp://user:password@rabbitmq")
        chennal = await connection.createChannel()
        await chennal.assertQueue(queue, { durable: true })
        console.log("Connected to Rabbitmq")

        app.listen(PORT, () => {
            console.log(`listen to port ${PORT}`)
        })
    }
    catch (error) {
        console.log(error.message)
        if (error.message.includes("connect ECONNREFUSED")) {
            setTimeout(() => connectAndStartUp(), 5000)
        }

    }

}


connectAndStartUp()