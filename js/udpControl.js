const io = require('./ioServer')
const ucon = require("./ucon")

const server = ucon.server("0.0.0.0", 4000)
var currentControls = {}

io.on("connection" ,(client)=>{
    client.on("car-control", (data)=>{
        if (JSON.stringify(currentControls) != JSON.stringify(data)) {
            console.log(data);
            server.broadcast(JSON.stringify(data))
            currentControls = data
        }
    })
})