const dgram = require('dgram')
const server = dgram.createSocket('udp4')
const io = require('./ioServer')
const port = 5000

//new socket connect
server.on("listening", ()=>{
    console.log("UPD Server open on port: "+ port);
})

server.on("message", (data)=>{
    io.sockets.emit("frame",data.toString('base64'))
})

//new frame come in 
server.bind(port)
