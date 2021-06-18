var controls = {
    axis: 0,
    pan: 0,
    tilt: 0,
    speed: 0,
    reverse: 0,
    gear: 1,
    bitrate: 0
}

const pressed = {
    gearUp: false,
    gearDown: false,
    bitrateUp: false,
    bitrateDown: false
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
    controls.axis = round(gamepad.axes[0]) *-1 
    controls.pan = round(gamepad.axes[2] *-1)
    controls.tilt = round(gamepad.axes[3])
    controls.reverse = gamepad.buttons[6].value
    controls.speed = gamepad.buttons[7].value

    //Gear Up
    if(gamepad.buttons[5].value == 1 && pressed.gearUp == false){
        pressed.gearUp = true
        if(controls.gear + 1 < 6){
            controls.gear += 1
            gear.innerHTML = controls.gear
        }
    }
    else if (gamepad.buttons[5].value == 0) {
        pressed.gearUp = false
    }
    //Gear Down
    if(gamepad.buttons[4].value == 1 && pressed.gearDown == false){
        pressed.gearDown = true
        if(controls.gear - 1 > 0){
            controls.gear -= 1
            gear.innerHTML = controls.gear
        }
    }
    else if (gamepad.buttons[4].value == 0) {
        pressed.gearDown = false
    }

    //Bitrate UP
    if(gamepad.buttons[12].value == 1 && pressed.bitrateUp == false){
        pressed.bitrateUp = true
        socket.emit("bitrate",{status: "up"})
        controls.bitrate += 1
    }
    else if (gamepad.buttons[12].value == 0) {
        pressed.bitrateUp = false
    }
    //Bitrate Down
    if(gamepad.buttons[13].value == 1 && pressed.bitrateDown == false){
        pressed.bitrateDown = true
        socket.emit("bitrate",{status: "down"})
        controls.bitrate -= 1
    }
    else if (gamepad.buttons[13].value == 0) {
        pressed.bitrateDown = false
    }

    window.requestAnimationFrame(loop)

    socket.emit("car-control", controls)
} 

setTimeout(() => {
    var gear = document.getElementById("gear")
    var conn = document.getElementById("connection")
    gear.innerHTML = controls.gear
    conn.innerHTML = "-"
}, 500);

window.addEventListener("gamepadconnected", (event) =>{
    console.log("connected")
    window.requestAnimationFrame(loop)
})

socket.on("telemetry", (data)=>{
    console.log(data.connection);
    var conn = document.getElementById("connection")
    conn.innerHTML = data.connection.signalSimple
})