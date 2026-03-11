const express = require("express")
const axios = require("axios")
const pino = require("pino")
const expressPino = require("express-pino-logger")
const os = require("os")
const cluster = require("cluster")
const { validator } = require("./middleware/webhook-validator")
const { getWithRetry } = require("./utils/getWithRetry")
const app = express()

const destination = pino.destination({ dest: "./temp/webhook.log" })
const logger = pino(destination)
const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(expressPino({ logger }))
const proccessedId = []
// os -----cluster

const cpus = os.cpus().length

// if (cluster.isPrimary) {
//     for (let i = 0; i < cpus; i++) {
//         cluster.fork()
//     }

//     cluster.on('exit', (worker, code, single) => {
//         console.log(`worker ${worker.process.id} died`)
//         cluster.fork()
//     })
// } else {
    // logger.info(`${cluster.worker.id}`)
    // console.log(`${cluster.worker.id}`)
    function checkIdValidator(id) {
        if (proccessedId.includes(id)) {
            return true
        } else {
            proccessedId.push(id)
            return false
        }

    }
    app.post("/webhook", validator, async (req, res) => {

        try {
            logger.info("Starting request")
            if (checkIdValidator(req.body.id)) {
                throw new Error(`${req.body.id} is already processed. `)
            }
            switch (req.body.type) {
                case "order_placed":
                    req.log.info("order_placed")
                    const response = await getWithRetry("https://jsonplaceholder.typicode.com/users", 1)
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


            // return res.status(200).json({ message: `Webhook Received by ${cluster.worker.id}` });
            return res.status(200).json({ message: `Webhook Received` });
        }
        catch (err) {
            logger.error(err)
            return res.status(500).json({ message: err.message })
        }

    })

    app.listen(PORT, () => {
        logger.info("Listen port 3000")
    })

// }