

const express = require("express");
const app = express();

app.get("/",function(req,res){
  res.sendFile(__dirname + "/index.html")

})


app.listen(3000,function(){  // Here the request is comming but our server doesn't know what to respond to that request.
  console.log("Server has started at port 3000.");
});
