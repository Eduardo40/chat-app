const socket = io();
const addUserBtn = $(".setUsername");
const usernameField = $(".username");
socket.on('connect', function (data) {
    socket.on("newUser", function (msg) {
        console.log(msg);
    })
    console.log("Connected to the server");
});
socket.on("disconnect", function (socekt) {
    console.log("Bye bye");
});

$("form").on("submit", function (e) {
    e.preventDefault ? e.preventDefault() : (e.returnValue = false);
    const from = usernameField.val();
    const text = document.querySelector(".text").value;
    if(addUserBtn.prop("disabled") === true && from.length > 0 && text.length > 0){
        if (from === "Admin") {
            return socket.emit("createMessage", {
                from: "Admin",
                text: "username \"Admin\" is is unique, and can't be used"
            }, function (serverMessage) {});
        }
        if (from.length > 0 && text.length > 0) {
            socket.emit("createMessage", {
                from,
                text
            }, function (serverMessage) {
            });
            $(".text").val("")
        } else {
            alert("Please fill out username or text field");
        }
    }else{
        socket.emit("createMessage",{
            from:"Admin",
            text:"Please fill out all fields"
        },function(){
            $(".text").val("")
            
        })
    }
});

$(".setUsername").on("click", function(e){
    e.preventDefault ? e.preventDefault() : (e.returnValue = false);
    const to = usernameField.val()
    if(to.length < 2){
      return alert("Username must have at least length of 2");
    }else if(to === "Admin"){
        usernameField.val("");
        return alert("Your username can't be \"Admin\"");
    }
    socket.emit("setUsername",{
        username:to
    },function(user){
    });
});

socket.on("sendUser",function(user){
    addUserBtn.prop({
        disabled:user.usernameFieldDisabled,
    });
    usernameField.prop({
        disabled:user.usernameFieldDisabled
    })
    addToHtml(user);

});

socket.on("newMessage", function(msg) {
    addToHtml(msg);
});

function addToHtml(user) {
    window.scrollBy(0, window.outerHeight)
    const hr = $("<hr>");
    const p = $("<p></p>");
    const i = $("<i></i>")
    const small = $("<small></small>");
    const strong = $("<strong></strong>");
    const br = $("<br>");
    const msgPlace = $(".mesage");
    i.text(`${user.msg.from}: `);
    small.text(`${user.msg.createdAt}`);
    strong.append(i);
    p.append(strong);
    p.append(`${user.msg.text}`);
    p.append(br);
    p.append(small);
    msgPlace.append(hr);
    msgPlace.append(p)
}