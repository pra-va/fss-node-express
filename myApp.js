require('dotenv').config();
var express = require('express');
var app = express();

console.log("Hello World");

// app.get("/", function(req, res) {
//     res.send("Hello Express");
// });

app.use("/public", express.static(__dirname + "/public"));

app.use(function(req, res, next) {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
});

app.get("/", function(req, res) {
    const path = __dirname + "/views/index.html";
    res.sendFile(path);
});

app.get("/json", function(req, res) {
    const isUppercase = process.env.MESSAGE_STYLE === "uppercase";
    const helloJson = "Hello json";
    const message = isUppercase ? helloJson.toUpperCase() : helloJson;
    res.json({message});
});

app.get(
    "/now",
    function(req, res, next) {
        req.time = new Date().toString();
        next();
    },
    function(req, res) {
        res.json({
            time: req.time
        });
    }
);





































 module.exports = app;
