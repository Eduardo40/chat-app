const express = require("express");
const app = express();
const path = require("path");
const moment = require("moment");
const socket = require("socket.io");
const helmet = require("helmet");
const {
    generateMesg
} = require("./utils/message");

app.use(helmet());
//port setup
const port = process.env.PORT || 3000;
var server = require('http').Server(app);
var io = require('socket.io')(server);
//fix ugly path
const publicPath = path.join(__dirname, "../public");
const msgs = [];
//setup index.html
app.use(express.static(publicPath));
let users = [];

//root route
app.get("/", (req, res) => {
    res.send("HEJawdawdEHJEHJ");
});

io.on('connection', (socket) => {
    socket.on("createMessage", (msg, cb) => {
        const user = users.filter((userFromArray)=> userFromArray === msg.from);
        if(users.includes(user[0])){
            msg.createdAt = moment().format("DD.MM.YYYY, kk:mm");
            io.emit("newMessage",{
                msg:msg
            })
        }else{
            return socket.emit("newMessage",{
                msg:generateMesg("Admin","Please fill out empty fields")
            })
        }

    });

    socket.on("setUsername", (user, cb) => {
        const existingUsers = users.filter((user2) => user2 === user.username);
        if (existingUsers[0] === user.username) {
            cb(user);
            return socket.emit("sendUser", {
                msg: generateMesg("Admin", `username \"${user.username}\" already is in use, please pick another one`),
                usernameFieldDisabled: false
            });
        } else if (existingUsers.length === 0) {
            users.push(user.username);
            socket.emit("sendUser", {
                usernameFieldDisabled: true,
                msg: generateMesg("Admin",`You will be visible as: ${user.username}`)

            });
            socket.broadcast.emit("newMessage", {
                msg: generateMesg("Admin", `${user.username} joined to the chat!`)
            });
        }
        socket.on("disconnect", () => {
            const newUserArray = users.filter((user2)=> user2 !== user.username);
            users = newUserArray;
            socket.broadcast.emit("newMessage", {
                msg: generateMesg("Admin", `${user.username} has left the chat`)
            });
        });
    });

});

server.listen(port, () => {
    console.log(`App listening on port ${port}`);
});