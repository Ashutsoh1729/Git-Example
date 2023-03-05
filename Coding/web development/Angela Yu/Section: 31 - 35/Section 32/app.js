const express = require("express")
const ejs = require("ejs")
const bodyParser = require("body-parser")
const app = express()
const mongoose = require("mongoose")

app.use((req, res, next) => {  // It will handel the content security policiy errors
    res.setHeader("Content-Security-Policy", "font-src 'self' http://localhost:3000");
    next();
});
app.set('view engine', 'ejs') // Here we are telling the server to check the ejs file in a view directory
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

// Connecting our Node server with the MongoDB server using mongoose
mongoose.connect("mongodb://localhost:27017/wikiDB", { useNewUrlParser: true })

const articleSechema = {
    title: String,
    content: String
}
const Article = mongoose.model("Article", articleSechema);

// TODO
// Here we are going to create the get route which will be used for fetching the data from the Database
app.get("/article", function (req, res) {
    Article.find()
        .then(result => {
            console.log(result);
            res.send(result);
        })
        .catch(error => {
            console.log(error);
        })
})



app.listen(3000, () => {
    console.log("Server has started at port 3000.");
})














