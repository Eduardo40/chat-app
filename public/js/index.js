const socket = io.connect('http://localhost:3000');
socket.on('connect', function (data) {
    socket.on("newUser",function(msg){
        console.log(msg);
    })
    console.log("Connected to the server");
});
socket.on("disconnect", function(socekt) {
    console.log("Bye bye");
})
document.querySelector("form").addEventListener("submit",function(e){
    const to = document.querySelector(".to").value;
    const text = document.querySelector(".text").value;
    e.preventDefault()
    socket.emit("createMessage",{from:to,text:text});
})
socket.on("newMessage",function(msg){
    console.log("New Message: ",msg);
    document.querySelector(".mesage").innerHTML+=`From: ${msg.from},Text: ${msg.text} created at: ${msg.createdAt}<br>`
});
