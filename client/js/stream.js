setTimeout(() => {
    var display = document.getElementById("display")
}, 100);

socket.on("frame", (data)=>{
    display.src = "data:image/jpg;base64,"+data
})