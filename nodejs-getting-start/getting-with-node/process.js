setTimeout(() => {
    console.log("Print settimeout")
}, 2000)

process.on("exit",()=>{
    console.log("process")
})

console.log("first print")