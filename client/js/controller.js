$var controls = {
    axis: 0,
    pan: 0,
    tilt: 0,
    speed: 0,
    gear: 1
}

const pressed = {
    up: false,
    down: false
}

function checkGamepads(){
    let gp = false

    for(var i = 0; i < 5; i++){
      if(navigator.getGamepads()[i]){
        gp = navigator.getGamepads()[i]
        
      }
    }

    if(gp != false){
      return gp
    }
    else{
      console.log("No Controller connected");
    }
}

function round(number){
    return Math.round(number * 100) / 100
}

function exponentiate(axe){
    if(axe < 0){
        return round(Number((axe * axe) *-1))
    }
    else{
        return round(Number(axe * axe))
    }
}

function loop(){
    let gamepad = checkGamepads()

    //console.log(gamepad.axes)[0]
    controls.axis = exponentiate(gamepad.axes[0]) *-1 
    controls.pan = exponentiate(gamepad.axes[2]) *-1
    controls.tilt = exponentiate(gamepad.axes[3])
    controls.speed =  gamepad.buttons[7].value

    if(gamepad.buttons[12].value == 1 && pressed.up == false){
        pressed.up = true
        if(controls.gear + 1 < 6){
            controls.gear += 1
            gear.innerHTML = controls.gear
        }
    }
    else if (gamepad.buttons[12].value == 0) {
        pressed.up = false
    }

    if(gamepad.buttons[13].value == 1 && pressed.down == false){
        pressed.down = true
        if(controls.gear - 1 > 0){
            controls.gear -= 1
            gear.innerHTML = controls.gear
        }
    }
    else if (gamepad.buttons[13].value == 0) {
        pressed.down = false
    }


    window.requestAnimationFrame(loop)

    socket.emit("car-control", controls)
} 

setTimeout(() => {
    var gear = document.getElementById("gear")
    gear.innerHTML = "1";
}, 500);

window.addEventListener("gamepadconnected", (event) =>{
    console.log("connected")
    window.requestAnimationFrame(loop)
})
