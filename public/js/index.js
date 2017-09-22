const socket = io();
socket.on('connect', function (data) {
    socket.on("newUser",function(msg){
        console.log(msg);
    })
    console.log("Connected to the server");
});
socket.on("disconnect", function(socekt) {
    console.log("Bye bye");
})

// document.querySelector("form").addEventListener("submit",function(e){
//     e.preventDefault()
//     const to = document.querySelector(".to").value;
//     const text = document.querySelector(".text").value;
//     socket.emit("createMessage",{from:to,text:text},function(serverMessage){
//         console.log(serverMessage);
//     });
// })

$("form").on("submit",function(e){
    e.preventDefault()
    const to = document.querySelector(".to").value;
    let text = document.querySelector(".text").value;
    if(to === "Admin"){
        return false;
    }
    if(to.length > 0 && text.length > 0){
        socket.emit("createMessage",{from:to,text:text},function(serverMessage){
               $(".text").val("")
            });
            $(".to").prop({disabled:true});
        }else{
            alert("Please fill out username or text field");
        }
    });
    
    socket.on("newMessage",function(msg){
        window.scrollBy(0, window.outerHeight) 
        let hr = $("<hr>");
        let p = $("<p></p>");
        let small = $("<small></small>");
        let strong = $("<strong></strong>");
        let br = $("<br>");
        let msgPlace = $(".mesage");
        strong.text(`${msg.from}:`);
        small.text(`${msg.createdAt}`);
        p.append(strong);
        p.append(`${msg.text}`);
        p.append(br);
        p.append(small);
        msgPlace.append(hr);
        msgPlace.append(p)
});
