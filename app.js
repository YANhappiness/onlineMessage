var express = require("express");
var app = express();
var ejs = require("ejs");
var router = require("./controller/router.js");
app.set("view engine","ejs");

app.use(express.static("./public"));

app.get("/",router.showIndex);
app.post("/",router.getData);
app.use("/page",router.page);
app.get("/del",router.del);

app.listen(3000);