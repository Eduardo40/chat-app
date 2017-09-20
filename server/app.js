const express = require("express");
const app = express();
const path = require("path");
const socket = require("socket.io");
//port setup
const port = process.env.PORT || 3000;
var server = require('http').Server(app);
var io = require('socket.io')(server);
//fix ugly path
const publicPath = path.join(__dirname,"../public");
const msgs = [];
//setup index.html
app.use(express.static(publicPath));

const data = ["Eduardo","peter","cigan"];

//root route
app.get("/", (req,res)=>{
    res.send("HEJawdawdEHJEHJ");
});

io.on('connection', (socket) => {
    socket.broadcast.emit("newUser","Sombody came here...")
    console.log("User connected");
    socket.on("newMsg",(msg)=>{
        console.log(msg.data);
        msgs.unshift(msg.data);
    })
    socket.emit("newMessage",{from:"Eduardo",text:"Hejhejehej"})
    socket.on("disconnect",(socket)=>{
        console.log("Bye bye y cunt");
    })
    socket.on("createMessage",(msg)=>{
        console.log(msg);
        msg.createdAt = new Date().toDateString();
        // console.log("New email created",msg);
        socket.broadcast.emit("newMessage",msg)
    })
  });

server.listen(port, () => {
    console.log(`App listening on port ${port}`);
});