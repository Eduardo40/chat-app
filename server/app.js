const express = require("express");
const app = express();
const path = require("path");
const socket = require("socket.io");
const {generateMesg} = require("./utils/message");
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
    socket.emit("newMessage",generateMesg("Admin","Welcome new user"));
    socket.broadcast.emit("newMessage",generateMesg("Admin", "New user joined to the chat!"));
    socket.on("createMessage",(msg,cb)=>{
        cb("Sucess message sent, this a message from the server")
        console.log(msg);
        msg.createdAt = new Date().toDateString();
        io.emit("newMessage",msg);
    })
    socket.on("disconnect",()=>{
        socket.broadcast.emit("newMessage",generateMesg("Admin","Someone left the chat.."));
    })
});

server.listen(port, () => {
    console.log(`App listening on port ${port}`);
});