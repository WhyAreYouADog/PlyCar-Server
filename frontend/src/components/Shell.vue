<template>
  <div id="main">
    <button id="button"><img id="img" v-if="!img.status" src="..\assets\terminal.png" @click="showTerminal()"><img id="img" v-else src="..\assets\cancel.png" @click="hideTerminal()"></button>
    <div class="terminalWrapper" id="terminalWrapper">
        <div id="terminal"></div>
    </div>
  </div>
</template>

<script>
import { FitAddon } from 'xterm-addon-fit';
import { Terminal } from 'xterm';
import { socket  } from "../config/io"
import { reactive } from 'vue';

export default {
  name: 'Shell',
  setup() {

    const img = reactive({
      status: false
    })

    const terminal = new Terminal()
    const fitAddon = new FitAddon()

    function showTerminal(){
      var term = document.getElementById("terminalWrapper")
      var stream = document.getElementById("display")
      term.style.visibility = "visible"
      stream.style.width = "calc(100% - 500px)"
      stream.style.height = "100vh"
      img.status = true
    }
     
    function hideTerminal(){
      var term = document.getElementById("terminalWrapper")
      var stream = document.getElementById("display")
      term.style.visibility = "hidden"
      stream.style.width = "100%"
      img.status = false
    }

    function initiateTerminal() {
        var term = document.getElementById("terminal")

        terminal.loadAddon(fitAddon);
        terminal.open(term)

        fitAddon.fit()
        socket.emit("shell-resize", {cols: terminal.cols, rows: terminal.rows})
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

    window.addEventListener("resize", fit())

    setTimeout(() => {
        initiateTerminal()
    }, 100)
  
    return{img,showTerminal,hideTerminal}
  }
}
</script>

<style scoped>
.terminalWrapper {
  position: fixed;
  right: 0;
  top: 0;
  width: 700px;
  height: 100vh;
  background-color: black;
  visibility: hidden;
}
#terminal {
  width: 100%;
  height: 100%;
}
#button{
  border-style: none;
  background-color: #ffffff;
  border-radius: 3px;
  width: 50px;
  height: 50px;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1;
  margin-right: 20px;
  margin-top: 20px;
}
#img{
  width: 37px;
}
</style>