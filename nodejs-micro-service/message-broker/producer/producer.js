const amqp = require("amqplib")
const express = require("express")

const app = express()

const PORT = process.env.PORT || 8080;
let id =0
app.use(express.json())

let chennal;

let connection;

const queue = "order"
const eventBuffer = []
const BATCH_SIZE = 10
const BATCH_INTERVAL = 1

function sendBatch() {
    if (eventBuffer.length > 0) {
        const batch = eventBuffer.splice(0, BATCH_SIZE)
        batch.forEach(event => {
            const message = JSON.stringify(event)
            chennal.sendToQueue(queue, Buffer.from(message))
            console.log(` [x] Sent message ${message}`)
        })
        console.log(` [x] Sent batch of ${batch.length} messages`)
    }
}


app.post("/send", (req, res) => {
    const msg = req.body.message
    if (!msg) {
        return res.status(400).send({ error: "Mesage is required" })
    }
    if (!chennal) {
        return res.status(400).send({ error: "Chennal is not establish" })
    }

    try {
        // chennal.sendToQueue(queue, Buffer.from(msg))
        eventBuffer.push(`${++id} ${msg}`)
        // console.log(`[X] Sent to queue: ${msg}`)
        console.log(`[X] Buffered: ${msg}`)
        res.send({success:true, message:'Message buffered'})
    }
    catch (err) {
        console.log(`Failed to sent message to queue`, err)
        res.send(500).send({ err: `Failed to send message to queue.`, msg })

    }

})

async function connectAndStartUp() {

    try {
        console.log("trying to connect")
        connection = await amqp.connect("amqp://user:password@rabbitmq")
        chennal = await connection.createChannel()
        // await chennal.assertQueue(queue, { durable: true })
        console.log("Connected to Rabbitmq")
        setInterval(sendBatch,BATCH_INTERVAL * 1000)
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