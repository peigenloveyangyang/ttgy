var express=require("express")
var app=express();

var mongoose=require("mongoose")

var bodyparser=require("body-parser")//用于解析post方法传递的参数
 app.use(bodyparser.urlencoded({extended:true}))

var db = mongoose.createConnection('localhost','user');
db.on('error',console.error.bind(console,'连接错误:'));
db.once('open',function(){
    console.log("成功");
});
var userSchema = new mongoose.Schema({
    tel:Number,
    pass:String,
    nick:String,
    headimg:String,
    birsday:String,
    email:String,
    sex:Number,
    yixf:String,
    dengji:String,
    buynum:Number,
    yue:String,
    jifen:String,
    dingdan:Array,
    dizhi:Array,
    shop:Array
});
var UserModel = db.model('users',userSchema);

app.get("/load",function (req,res) {

    UserModel.find(req.query,function (err,doc) {
        if(err){
            return console.log(err);
        }
        if(doc.length == 0){
            res.send({status:"0",msg:"登陆失败"})
        }else{
            res.send({status:"1",msg:"登陆成功"})
        }
    })
})

app.post("/regist",function (req,res) {
         var query=req.body;
         console.log(query)
        var tel =query.tel;
        var pass=query.pass;
        UserModel.find({tel:tel},function (err,doc) {
            if(doc.length==0){
                UserModel.create({tel:tel,pass:pass},function (err,doc) {
                    if(err){
                        res.send({status:"0",msg:err})
                    }else{
                        res.send({status:"1",msg:"注册成功"})
                    }
                })
            }else{
                res.send({status:"0",msg:"用户名存在"});
            }
        })

})

app.get("*",function (req,res) {
    var reg=/\.\w+$/;
    if(reg.test(req.path)){
        res.sendFile("/Users/lanou/Desktop/tao/11/"+req.path);
    }
})
app.listen(8080);