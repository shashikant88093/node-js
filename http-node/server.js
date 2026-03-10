const http = require('http')
const url = require('url')
const server= http.createServer()

server.on('request',(req,res)=>{
    const parseUrl = url.parse(req.url,true)
    console.log(parseUrl)
    if(req.method=="GET" && parseUrl.pathname=="metadata"){
        const {id} = parseUrl.query
        const metadata = services.fetchImageMetadata(id)
        console.log(metadata)
    }
})

server.listen(8080,()=>{
    console.log("listing port 8080")
})