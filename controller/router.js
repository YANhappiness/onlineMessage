
var mongo = require("../modle/mongo.js");
var formidable = require("formidable");

var sd = require("silly-datetime");

exports.showIndex = function(req,res){
    //获取当前记录数
    mongo.getAllCount("message",function(count){
        //查询数据
         size = 3;
         page = 1;
        //页数
        num = Math.ceil(count/5);
        //分页 pageNum未获取到
        pageNum =  (req.url).split("/")[1];
        mongo.find("message",{},{
            sort:{"time":-1},
            size:size,
            page:page
        },function(err,docs){
            res.render("index",{"data":docs ,"num":num});
        });
        return;
    })
}

//插入数据
exports.getData = function(req,res){
    //获取时间
    var date = sd.format(new Date(), 'YYYYMMDDHHmmss');
    //获取数据
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        if(err){
            throw err;
        }
        //插入数据
        mongo.insertOne("message",{
            "name":fields.name,
            "message":fields.message,
            "time":date
        },function(err,docs){
            res.redirect("/")
        })
    });
    return;
}

// 删除数据
exports.del = function(req,res){
    var time = req.query.time;
    mongo.deleteMany("message",{"time":time},function(err,docs){
        res.redirect("/");
        console.log(time);
    })
}

//分页
exports.page = function(req,res){

        //获取当前记录数
    mongo.getAllCount("message",function(count){
        //查询数据
         size = 4;
         page = (req.url).split("/")[1];
        //页数
        num = Math.ceil(count/5);
        //分页 
        // pageNum =  (req.url).split("/")[1];
        mongo.find("message",{},{
            sort:{"time":-1},
            size:size,
            page:page
        },function(err,docs){
            res.render("hello");
            res.redirect("/");
        });
        return;
    })

    //Error:Can`t set headers after they are sent
}






