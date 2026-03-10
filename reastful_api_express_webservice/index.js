require("dotenv").config()
const express = require('express');
const {connectToDatabase} = require("./DB/connection")
const app = express();
const bookRoute = express.Router()
const {PORT = 3000 } = process.env;


connectToDatabase()


bookRoute.route("/book").get((req,res)=>{
    const response = {Content:"Book Has been trigger"}
    res.json(response)
})

app.use('/api',bookRoute)
app.get('/', (req, res) => {
  res.send('I am Back');
});

app.listen(PORT, () => {
  console.log(`hello ervey one ${PORT}`);
});
