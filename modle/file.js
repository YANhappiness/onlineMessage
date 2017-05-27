
var formidable = require("formidable");
var sd = require("silly-datetime");

exports.getData = function(req,res,callback){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        if(err){
            throw err;
        }
        callback(err,fields);
    });
    return;
}

exports.time = function(){

    return date;

}