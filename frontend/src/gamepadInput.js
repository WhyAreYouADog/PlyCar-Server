window.addEventListener("gamepadconnected", (event) =>{
    window.requestAnimationFrame()
})

var loop = ()=>{
    var gamepad = navigator.getGamepads()[1]

    console.log(gamepad);
}