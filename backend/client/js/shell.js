const terminal = new Terminal()
const fitAddon = new FitAddon.FitAddon()

var status = false

function initiateTerminal(){
    var term = document.getElementById("terminal")

    terminal.loadAddon(fitAddon);
    terminal.open(term)

    fitAddon.fit()
    socket.emit("shell-resize", {cols: terminal.cols, rows: terminal.rows})
}

function showTerminal(){
    var term = document.getElementById("terminalWrapper")
    var stream = document.getElementById("display")
    term.style.visibility = "visible"
    stream.style.width = "calc(100% - 500px)"
    stream.style.height = "100vh"
}

function hideTerminal(){
    var term = document.getElementById("terminalWrapper")
    var stream = document.getElementById("display")
    term.style.visibility = "hidden"
    stream.style.width = "100%"
}

function manageTerminal(){
    var termImg = document.getElementById("terminalImg")
    if(status == "true"){
        termImg.src = "./assets/terminal.png"
        hideTerminal()
        status = false
    }
    else{
        termImg.src = "./assets/cancel.png"
        showTerminal()
        status = true
    }
}

function fit() {
    fitAddon.fit()

    socket.emit("shell-resize", {cols: terminal.cols, rows: terminal.rows})
}

socket.on("shell-out", data => {
    terminal.write(data)
})

terminal.onData(key => {
    socket.emit("shell-in", key)
});

setTimeout(() => {
    initiateTerminal()
    window.addEventListener("resize", fit())
    var button = document.getElementById("terminalButton")
    button.addEventListener('click',()=>{manageTerminal()})
}, 100)