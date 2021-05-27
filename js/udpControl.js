const io = require('./ioServer')
const ucon = require("./ucon")

const server = ucon.server("0.0.0.0", 4000)

io.on("connection" ,(client)=>{
    client.on("car-control", (data)=>{
        server.broadcast(JSON.stringify(data))
    })
})