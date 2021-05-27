const net = require('net')
const tcpServer = net.createServer()
const io = require('./ioServer')
const tcpPort = 5050

var currentControls = {}
var tcpSocket

tcpServer.on('connection',(socket)=>{
    tcpSocket = socket
})

io.on("connection" ,(client)=>{
    client.on("car-control", (data)=>{
        if(tcpSocket){
            if (JSON.stringify(currentControls) != JSON.stringify(data)) {
                console.log(data);
                tcpSocket.write(JSON.stringify(data))
                currentControls = data
            }
        }
    })
})

tcpServer.listen(tcpPort,()=>{
    console.log("TCP Server open on port: " + tcpPort);
})


/*
if (JSON.stringify(currentControls) != JSON.stringify(data)) {

            currentControls = data
        }
*/
