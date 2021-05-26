console.clear()

const express = require('express')
const app = express()


//init the udp Server
const ioServer = require('./js/ioServer')
const udpServer = require('./js/udpServer')
const tcpServer = require('./js/tcpServer')

app.use(express.static('./dist'));


