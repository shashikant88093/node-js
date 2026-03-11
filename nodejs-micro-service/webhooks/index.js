const express = require("express")
const axios = require("axios")
const pino = require("pino")
const expressPino = require("express-pino-logger")
const { validator } = require("./middleware/webhook-validator")
const app = express()

const destination = pino.destination({dest:"./temp/webhook.log"})
const logger = pino(destination)
const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(expressPino({logger}))
app.post("/webhook", validator, async (req, res) => {
    // console.time()
    // res.status(200).send({ message: "Webhook Received" })
    // console.timeLog()

    switch (req.body.type) {
        case "order_placed":
            req.log.info("order_placed")
            const response = await axios.get("https://jsonplaceholder.typicode.com/users")
            req.log.info(response.data)

            break;
        case "order_cancelled":
            req.log.info("order_cancelled")
            break;
        case "order_dispatched":
            req.log.info("order dispatch")
            break;
        default:
            return res.status(400).json({ message: "Unknown event type" });


    }


    return res.status(200).json({ message: "Webhook Received" });


})

app.listen(PORT, () => {
    logger.info("Listen port 3000")
})