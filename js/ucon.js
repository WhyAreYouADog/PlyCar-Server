const udp = require('dgram');
const eventEmitter = require('events');

module.exports = {
    server: (interface, port) => {
        return createServer(interface, port)
    },
    client: (adress, port) => {
        return createClient(adress, port)
    }
}

function createServer(interface, port) {
    const server = udp.createSocket('udp4');
    const events = new eventEmitter()

    const clients = []

    server.on('error',function(error){
        console.log('ucon server errored: ' + error);
        server.close();
    });

    server.on("message", (data, info) => {
        if (!registerClient(data, info)) {
            events.emit("data", data)
        }
    })

    server.on('listening',() => {
        var address = server.address();
        var port = address.port;
        
        console.log(`Online at ${interface}:${port}`);

        //initializing auto disconnect
        autoDisconnect(1500)
    });

    events.broadcast = data => {
        for (client of clients) {
            dispatch(data, client)
        }
    }

    function dispatch(data, client) {
        if (!Buffer.isBuffer(data)) {
            data = Buffer.from(data)
        }

        console.log(`Sending to: ${client.address}:${client.port}`);

        server.send(data, client.port, client.address, err => {
            if(err) {
                console.log(err);
            }
        })
    }

    function isRegistered(client) {
        for (regClient of clients) {
            if (regClient.address == client.address) {
                setLastSignal(clients.indexOf(regClient))

                return true;
            }
        }

        return false;
    }

    function setLastSignal(index) {
        clients[index].lastSignal = Date.now()
    }

    function registerClient(data, client) {
        let isReg = false;

        if (String(data) == "ucon-connect") {
            if (!isRegistered(client)) {
                clients.push({
                    address: client.address,
                    port: client.port,
                    lastSignal: Date.now()
                });
                dispatch("ucon-confirm", client)
                console.log(`Client connected: ${client.address}:${client.port}`);
            }

            isReg = true
        }

        return isReg
    }

    function autoDisconnect(ms) {
        setInterval(() => {
            clients.forEach(client =>{
                if (Date.now() - client.lastSignal > ms) {
                    clients.splice(clients.indexOf(client), 1)
                    console.log(`Client timeout: ${client.address}:${client.port}`);
                }
            })
        }, ms);
    }

    server.bind(port, interface);

    return events
}

function createClient(adress, port) {
    const client = udp.createSocket('udp4');
    const events = new eventEmitter()

    client.on("message", (data, info) => {
        if (String(data) == "ucon-confirm") {
            console.log(`Connected to Server: ${info.address}:${info.port}`);
        }
        else {
            events.emit("data", data)
        }
    })

    events.send = data => {
        dispatch(data)
    }

    function dispatch(data) {
        if (!Buffer.isBuffer(data)) {
            data = Buffer.from(data)
        }

        client.send(data, port, adress, err => {
            if(err) {
                console.log(err);
            }
        });
    }

    function keepAlive() {
        setInterval(() => {
            dispatch("ucon-connect")
        }, 1000);
    }

    keepAlive()
    return events
}