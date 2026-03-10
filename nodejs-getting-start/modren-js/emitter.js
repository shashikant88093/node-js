const EventEmitter = require('events')

const myEventEmitter = new EventEmitter();

myEventEmitter.on('wroteCode',(param)=>{
    console.log(`I love ${param} coding language`)
})

myEventEmitter.emit('wroteCode',"Javascript")