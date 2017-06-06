var express = require("express");
var app = express();
var ejs = require("ejs");
var router = require("./controller/router.js");
//设置模版
app.set("view engine","ejs");
//移入静态文件
app.use(express.static("./public"));

app.get("/",router.showIndex); //首页
app.post("/",router.getData);  //表单提交
app.use("/page",router.page);  //分页
app.get("/del",router.del);    //删除操作

app.listen(3000);