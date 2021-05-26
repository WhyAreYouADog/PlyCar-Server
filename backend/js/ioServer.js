const app = require('../index')
const ioServer = require('http').createServer(app)
const io = require('socket.io')(ioServer, {cors: {origin: '*'}})

const ioPort = 80

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
})   

ioServer.listen(ioPort, ()=>{
    console.log("Socket io open on port: " + ioPort)
})

module.exports = io

/*
var currentControls = {}

module.exports = function open(io){
    io.on("connect", client => {

        console.log(client.client.conn.remoteAddress);

        client.on("car-control", data => {
            if (JSON.stringify(currentControls) != JSON.stringify(data)) {
                console.log(data);
                currentControls = data
            }
        })

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
    })   
}*/