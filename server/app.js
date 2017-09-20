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

//setup index.html
app.use(express.static(publicPath));

const data = ["Eduardo","peter","cigan"];

//root route
app.get("/", (req,res)=>{
    res.send("HEJawdawdEHJEHJ");
});

io.on('connection', (socket) => {
    console.log("User connected");
    socket.on("disconnect",(socket)=>{
        console.log("Bye bye y cunt");
    })
  });


server.listen(port, () => {
    console.log(`App listening on port ${port}`);
});