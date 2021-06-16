const express = require('express')
const app = express()
const ioServer = require('http').createServer(app)
const Split = require("stream-split")

const ucon = require("./js/ucon").server("0.0.0.0", 6000)
const io = require('socket.io')(ioServer, {cors: {origin: '*'}})

const ioPort = 8080
var currentControls = {}

const NALSeparator = new Buffer.from([0, 0, 0, 1])
const NALSplitter = new Split(NALSeparator)

app.use(express.static('./client'));

ucon.on("frame", (data)=>{
    io.sockets.emit("frame",data)
})

ucon.on("telemetry", data => {
    io.sockets.emit("telemetry", data)
})

ucon.on("ucon-raw", data => {
    NALSplitter.write(data)
})

NALSplitter.on('data', (data) => {
    io.sockets.emit("video", data)
})

io.on("connect", client => {

    console.log(client.client.conn.remoteAddress);
    
    //if user shell input
    client.on("shell-in", data => {
        io.sockets.emit("shell-in", data)
    })
    //py shell output
    client.on("shell-out", data => {
        io.sockets.emit("shell-out", data)
    })
    //user shell resize
    client.on("shell-resize", data => {
        io.sockets.emit("shell-resize", data)
    })
    client.on("car-control", (data)=>{
        if (JSON.stringify(currentControls) != JSON.stringify(data)) {
            console.log(data);
            ucon.broadcast("car-control",data)
            currentControls = data
        }
    })
    client.on("bitrate", (data)=>{
        ucon.broadcast("bitrate",data)
    })
})   


ioServer.listen(ioPort, ()=>{
    console.log("Socket io open on port: " + ioPort)
})
