
var mongo = require("../modle/mongo.js");
var formidable = require("formidable");
var sd = require("silly-datetime");

exports.showIndex = function(req,res){
    //获取当前记录数
    mongo.getAllCount("message",function(count){
        //查询数据
         size = 3;
         page = 0;
        //页数
        num = Math.ceil(count/size);
        //分页 pageNum未获取到
        pageNum =  (req.url).split("/")[1];
        mongo.find("message",{},{
            sort:{"time":-1},
            size:size,
            page:page
        },function(err,docs){
            res.render("index",{"data":docs ,"num":num});
        });
    })
}

//插入数据
exports.getData = function(req,res,next){
    //获取时间
    var date = sd.format(new Date(), 'YYYYMMDDHHmmss');
    //获取数据
    var form = new formidable.IncomingForm();
    //生成随机数
    rand = parseInt(Math.random()*1000);
    form.parse(req, function(err, fields, files) {
        if(err){
            throw err;
        }

        //判断输入值是否为空 为空不提交
        if(fields.name !== '' && fields.message !== ''){
            //插入数据
            mongo.insertOne("message",{
                "name":fields.name,
                "message":fields.message,
                "time":date,
                "rand":date+rand
            },function(err,docs){
                res.redirect("/");
            });
        }
        res.redirect("/"); //地址跳转
    });
    return next;
}

// 删除数据
exports.del = function(req,res,next){
    var rand = req.query.rand;   //删除时间戳
    mongo.deleteMany("message",{"rand":rand},function(err,docs){
        res.render("/");

        //res.redirect("back");     //删除数据后停留在本页 如果本页灭有数据则重定向到上一页
        //if(){
        //}
    });
}

//分页
exports.page = function(req,res,next){
        //获取当前记录数
    mongo.getAllCount("message",function(count){
        //查询数据
         size = 3;
         page = (req.url).split("/")[1];
        //判断是否存在下一页
        if(page == "next"){
            console.log(page);
        }



        //判断是否存在上一页
        if(page == "prev"){
            if(page-1){
                page = page-1;
            }
            page = page;
            return page;
        }
        //页数
        num = Math.ceil(count/size);
        //分页
        mongo.find("message",{},{
            sort:{"time":-1},
            size:size,
            page:page
        },function(err,docs){
            res.render("index",{"data":docs ,"num":num});
        });
        return next;
    })
    //Error:Can`t set headers after they are sent
}