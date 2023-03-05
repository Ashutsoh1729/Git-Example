//jshint esversion:6

require('dotenv').config()
const express = require("express")
const bodyParser = require("body-parser")
const ejs = require("ejs")
const mongoose = require("mongoose")
const encrypt = require("mongoose-encryption")


const app = express()
app.use(express.static("public"))
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))

// Below is the database connecting module with the user data schema

mongoose.connect("mongodb://localhost:27017/userDB", { useNewUrlParser: true })  // Connecting to MongoDB server usign mongoose

const userSchema = new mongoose.Schema({  // Declaring it as a fully mongoose schema, not as a Javascript object
    email: String,
    password: String
})

const secrets = process.env.SECRET;
userSchema.plugin(encrypt, { secret: secrets, encryptedFields: ["password"] })


const User = new mongoose.model("User", userSchema)    // Define a Mongoose model called "User" using the userSchema
// Here it ends



app.get("/", function (req, res) {
    res.render('home')
})

app.route("/login")
    .get(function (req, res) {
        res.render('login')
    })
    .post(function (req, res) {
        username = req.body.username;
        password = req.body.password;

        User.findOne({ email: username }).then((foundUser) => {
            if (foundUser) {
                if (foundUser.password === password) {
                    res.render("secrets")
                }
            }
        }).catch((err) => {
            console.log(err)
        })
    })

app.route("/register")              // Here i have used Chained Route Handlers  -> Everything is working perfectly.
    .get(function (req, res) {      // Here it i
        res.render('register')
    })
    .post(function (req, res) {
        const newUser = new User({
            email: req.body.username,
            password: req.body.password
        });
        newUser.save().then(() => {
            res.render("secrets")
        }).catch((err) => {
            console.log(err);
        })
    })








app.listen(3000, function () {
    console.log("Server has started at port 3000.");
})


