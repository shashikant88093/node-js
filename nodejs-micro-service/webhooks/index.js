const express = require("express")

const app = express()

const PORT = process.env.PORT || 3000;

app.use(express.json())

app.post("/webhook",(req,res)=>{
    console.log(req.body);
    res.status(200).send({message : "Webhook Received"})

})

app.listen(PORT,()=>{
    console.log("Listen port 3000")
})