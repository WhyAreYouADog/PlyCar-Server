function initateStream() {
    window.player = new Player({ useWorker: true, webgl: 'auto', size: { width: 400, height: 300 } })
    const playerElement = document.getElementById('display')
    playerElement.appendChild(window.player.canvas)

    socket.on("video", data => {
        //console.log(String(data).length);
        window.player.decode(new Uint8Array(data));
    })
}

setTimeout(() => {
    initateStream()
}, 100);