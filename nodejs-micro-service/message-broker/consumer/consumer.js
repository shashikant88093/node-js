const amqp = require("amqplib")

const queue = "order"

async function connectAndListen() {
    try {
        const connection = await amqp.connect('amqp://user:password@rabbitmq')
        const chennal = await connection.createChannel()
        await chennal.assertQueue(queue, { durable: true })
        chennal.prefetch(1)

        await chennal.consume(queue, (mesage) => {
            const text = mesage.content.toString()
            console.log(" [X] Received '%s' ", text)
            const seconds = text.split('.').length - 1;
            const proccessSucceeded = Math.random() > 0.5;
            setTimeout(() => {
                if (proccessSucceeded) {
                    console.log(`[x] Succeeded  with message : ${text}`)
                    chennal.ack(mesage)
                }else{
                    console.log(`[x] Unsucceeded  with message : ${text}`)

                }

            },
                seconds * 1000)
        }, { noAck: false })
        console.log("[*] Waiting for messages. To exist press CTRL+C")
    }
    catch (err) {
        console.warn(err)
        console.log(err.mesage)
        if (err.mesage.includes("connect ECONNREFUSED")) {
            setTimeout(() => connectAndListen(), 5000)
        }


    }
}

connectAndListen()