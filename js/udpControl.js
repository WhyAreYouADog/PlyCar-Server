const io = require('./ioServer')
const ucon = require("./ucon").server("0.0.0.0", 6000)

var currentControls = {}

io.on("connection" ,(client)=>{
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