var express = require("express");
var formidable = require("formidable");
var mongoose = require("mongoose");
var fs = require("fs");

var manage = express.Router();
var db = mongoose.createConnection('localhost','fruitdb');
//监测数据库连接成功
db.on('error',console.error.bind(console,'连接错误:'));
db.once('open',function(){
    console.log("成功");
});

var fruitSchema = new mongoose.Schema({
    name:String,
    price:Number,
    size:String,
    num:String,
    sweet:String,
    saveMethod:String,
    message:String,
    explain:String,
    shopClass:String,
    skuId:String,
    place:String,
    kouHao:String,
    img:Array
});
var fruitModel = db.model('fruit',fruitSchema);

var freshSchema = new mongoose.Schema({
    name:String,
    price:Number,
    size:String,
    num:String,
    sweet:String,
    saveMethod:String,
    message:String,
    explain:String,
    shopClass:String,
    skuId:String,
    place:String,
    kouHao:String,
    img:Array
});
var freshModel = db.model('fresh',freshSchema);

var giftSchema = new mongoose.Schema({
    name:String,
    price:Number,
    size:String,
    num:String,
    sweet:String,
    saveMethod:String,
    message:String,
    explain:String,
    shopClass:String,
    skuId:String,
    place:String,
    kouHao:String,
    img:Array
});
var giftModel = db.model('gift',giftSchema);


manage.post('/fruit',function(req,res){
    var form = new formidable.IncomingForm();//新建表单
    form.parse(req,function (err,data,files) {
        if(err) console.log(err);
        var date = new Date();
        var dateTime = date.getTime();
        /*fs.exists("../images",function(exists){
            if(!exists){
                fs.mkdir("../images",0777);
            }
        })*/
        var num = 0;
        var imgs = [];
        for(i in files){
            var arr = files[i].type.split("/");
            var img_type = arr[1];
            if(img_type != "octet-stream"){
                var newName = dateTime+num+"."+img_type;
                num++;
                var rs=fs.createReadStream(files[i].path);
                var ws=fs.createWriteStream("../images/"+newName);
                rs.pipe(ws);
                imgs.push("images/"+newName);
            }
        }
        data.img = imgs;
        console.log(data);
        // // 存储数据
        fruitModel.create(data,function (err,doc) {
            if(err){return console.log(err)}
            console.log("插入数据库成功");
        })
    })
    res.end("请求结束");
})

manage.post('/fresh',function(req,res){
    var form = new formidable.IncomingForm();//新建表单
    form.parse(req,function (err,data,files) {
        if(err) console.log(err);
        var date = new Date();
        var dateTime = date.getTime();
        /*fs.exists("../images",function(exists){
         if(!exists){
         fs.mkdir("../images",0777);
         }
         })*/
        var num = 0;
        var imgs = [];
        for(i in files){
            var arr = files[i].type.split("/");
            var img_type = arr[1];
            if(img_type != "octet-stream"){
                var newName = dateTime+num+"."+img_type;
                num++;
                var rs=fs.createReadStream(files[i].path);
                var ws=fs.createWriteStream("../images/"+newName);
                rs.pipe(ws);
                imgs.push("images/"+newName);
            }
        }
        data.img = imgs;
        console.log(data);
        // // 存储数据
        freshModel.create(data,function (err,doc) {
            if(err){return console.log(err)}
            console.log("插入数据库成功");
        })
    })
    res.end("请求结束");
})

manage.post('/gift',function(req,res){
    var form = new formidable.IncomingForm();//新建表单
    form.parse(req,function (err,data,files) {
        if(err) console.log(err);
        var date = new Date();
        var dateTime = date.getTime();
        /*fs.exists("../images",function(exists){
         if(!exists){
         fs.mkdir("../images",0777);
         }
         })*/
        var num = 0;
        var imgs = [];
        for(i in files){
            var arr = files[i].type.split("/");
            var img_type = arr[1];
            if(img_type != "octet-stream"){
                var newName = dateTime+num+"."+img_type;
                num++;
                var rs=fs.createReadStream(files[i].path);
                var ws=fs.createWriteStream("../images/"+newName);
                rs.pipe(ws);
                imgs.push("images/"+newName);
            }
        }
        data.img = imgs;
        console.log(data);
        // // 存储数据
        giftModel.create(data,function (err,doc) {
            if(err){return console.log(err)}
            console.log("插入数据库成功");
        })
    })
    res.end("请求结束");
})

module.exports = manage;