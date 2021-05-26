<template>
  <img id="display" alt="No Video incoming">
</template>

<script>

import { socket } from '../config/io'
import { reactive } from 'vue'

export default {

  setup(){

    var display

    socket.on("frame", data =>{
      if(display != undefined){
        display.src = `data:image/jpg;base64, ${data}`

      }
      else {
        display = document.getElementById("display")
      }
      })
    }
}
</script>

<style scoped>
#display{
  width: 100%;
  height: 100vh;
}
</style>