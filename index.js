console.clear()

const express = require('express')
const app = express()

app.use(express.static('./client'));

module.exports = app

//init the udp Server
const ioServer = require('./js/ioServer')
const udpServer = require('./js/udpServer')
const tcpServer = require('./js/tcpServer')
