const express = require("express");
const app = express();
const path = require("path");

//port setup
const port = process.env.PORT || 3000;


//fix ugly path
const publicPath = path.join(__dirname,"../public");

//setup index.html
app.use(express.static(publicPath));


//root route
app.get("/", (req,res)=>{
    res.send("HEJawdawdEHJEHJ");
});


app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});