<template>
  <div>
    <Controller />
    <Stream />
    <Shell />
  </div>
</template>

<script>
import Controller from './components/Controller'
import Stream from './components/Stream'
import Shell from './components/Shell'

export default {
  name: 'App',
  components: {
    Controller,
    Stream,
    Shell
  },

  setup(){
    console.log("Icons: https://flaticon.com Creator: https://www.freepik.com/");
  }
}
</script>

<style>
div::-webkit-scrollbar {
  display: none;
}
#app {
  margin: 0%;
  padding: 0%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0%;
  padding: 0%;
}
body{
  margin: 0%;
  padding: 0%;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
</style>
