var express = require("express");
var mongoose = require("mongoose");
var ObjectId = mongoose.ObjectID;
var db = mongoose.createConnection('localhost','fruitdb');
db.on('error',console.error.bind(console,'连接错误:'));
db.once('open',function(){
    console.log("成功");
});
var app = express();

// 数据导入部分
/*var manage = require("./manage");
app.use(manage);*/

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
var ids = [{"_id":mongoose.Types.ObjectId("59537c5413c46304cabc1c39")},
    {"_id":mongoose.Types.ObjectId("595391f613c46304cabc1c42")},
    {"_id":mongoose.Types.ObjectId("595397a213c46304cabc1c44")},
    {"_id":mongoose.Types.ObjectId("59539ae513c46304cabc1c4d")},
    {"_id":mongoose.Types.ObjectId("59539b2913c46304cabc1c4e")},
    {"_id":mongoose.Types.ObjectId("5954b0c8e33b5103fe11597e")},
    {"_id":mongoose.Types.ObjectId("5954afdce33b5103fe11597d")},
    {"_id":mongoose.Types.ObjectId("5954b34a796dc00447f950c4")},
    {"_id":mongoose.Types.ObjectId("5954b41c796dc00447f950c5")},
    {"_id":mongoose.Types.ObjectId("5954b27d796dc00447f950c3")},
    {"_id":mongoose.Types.ObjectId("5954e7484078560531567c80")},
    {"_id":mongoose.Types.ObjectId("5954e8e54078560531567c81")},
    {"_id":mongoose.Types.ObjectId("5954e9e84078560531567c82")},
    {"_id":mongoose.Types.ObjectId("5954eea94078560531567c83")},
    {"_id":mongoose.Types.ObjectId("5955d826a96d6e033fc6f03e")},
    {"_id":mongoose.Types.ObjectId("5954af7fe33b5103fe11597c")}]

app.get("/indexData",function (req,res) {
    var arr = {};
    fruitModel.find({},{},{skip:48,limit:8},function (err,doc) {
        if(err) console.log(err);
        arr.furit = doc;
        freshModel.find({},{},{skip:5,limit:10},function (err,doc) {
            if(err) console.log(err);
            arr.fresh = doc;
            giftModel.find({},{},{limit:10},function (err,doc) {
                if(err) console.log(err);
                arr.gift = doc;
                fruitModel.find({$or:ids},function (err,doc) {
                    if(err) console.log(err);
                    arr.quan = doc;
                    res.send(arr);
                })
            })
        })
    })
})
// hua
app.get("/search/:hua",function (req,res) {
    var str=decodeURI(req.originalUrl)
    str=str.split("/")[2];
    var reg=new RegExp(str);
    var whereStr={"name":reg}
    var searchObj={}
     fruitModel.find(whereStr,function (err,doc) {
         if(err) console.log("Error"+err);
         searchObj.datas=doc;
         // console.log(searchObj.datas)
         fruitModel.find(whereStr,{size:1,shopClass:1,place:1,_id:0},function (err,doc) {
             if(err) console.log(err)
             var sizeArr = [];
             var shopArr = [];
             var placeArr = [];
             for(i in doc){
                 for(var j=0;j<sizeArr.length;j++){
                     if(doc[i].size==sizeArr[j]) {break;}
                 }
                 if(j==sizeArr.length) {sizeArr.push(doc[i].size);}

                 // shop筛选
                 for(var k=0; k<shopArr.length; k++) {
                     if (doc[i].shopClass == shopArr[k]) {break;}
                 }
                 if (k == shopArr.length) {shopArr.push(doc[i].shopClass);}
                 // palce筛选
                 for(var l=0; l<placeArr.length; l++) {
                     if (doc[i].place == placeArr[l]) {break;}
                 }
                 if (l == placeArr.length) {placeArr.push(doc[i].place);}
             }
             searchObj.sizeArr=sizeArr;
             searchObj.shopArr=shopArr;
             searchObj.placeArr=placeArr;
             res.send(searchObj)
         })
     })

})

app.get("/:case/detail",function (req,res) {
    var navObj = {};
    switch (req.originalUrl){
        case "/fruit/detail" :
            fruitModel.find({},function (err,doc) {
                if(err) console.log(err);
                navObj.datas = doc;
                fruitModel.find({},{size:1,shopClass:1,place:1,"_id":0},function (err,doc) {
                    if(err) console.log(err);
                    var sizeArr = [];
                    var shopArr = [];
                    var placeArr = [];
                    for(i in doc){
                        for(var j=0; j<sizeArr.length; j++) {
                            if (doc[i].size == sizeArr[j]) {break;}
                        }
                        if (j == sizeArr.length) {sizeArr.push(doc[i].size);}
                        // shop筛选
                        for(var k=0; k<shopArr.length; k++) {
                            if (doc[i].shopClass == shopArr[k]) {break;}
                        }
                        if (k == shopArr.length) {shopArr.push(doc[i].shopClass);}
                        // palce筛选
                        for(var l=0; l<placeArr.length; l++) {
                            if (doc[i].place == placeArr[l]) {break;}
                        }
                        if (l == placeArr.length) {placeArr.push(doc[i].place);}
                    }
                    navObj.sizeArr = sizeArr;
                    navObj.shopArr = shopArr;
                    navObj.placeArr = placeArr;
                    res.send(navObj);
                })
            })
            break;
        case "/fresh/detail" :
            freshModel.find({},function (err,doc) {
                if(err) console.log(err);
                navObj.datas = doc;
                freshModel.find({},{size:1,shopClass:1,place:1,"_id":0},function (err,doc) {
                    if(err) console.log(err);
                    var sizeArr = [];
                    var shopArr = [];
                    var placeArr = [];
                    for(i in doc){
                        for(var j=0; j<sizeArr.length; j++) {
                            if (doc[i].size == sizeArr[j]) {break;}
                        }
                        if (j == sizeArr.length) {sizeArr.push(doc[i].size);}
                        // shop筛选
                        for(var k=0; k<shopArr.length; k++) {
                            if (doc[i].shopClass == shopArr[k]) {break;}
                        }
                        if (k == shopArr.length) {shopArr.push(doc[i].shopClass);}
                        // palce筛选
                        for(var l=0; l<placeArr.length; l++) {
                            if (doc[i].place == placeArr[l]) {break;}
                        }
                        if (l == placeArr.length) {placeArr.push(doc[i].place);}
                    }
                    navObj.sizeArr = sizeArr;
                    navObj.shopArr = shopArr;
                    navObj.placeArr = placeArr;
                    res.send(navObj);
                })
            })
            break;
        case "/gift/detail" :
            giftModel.find({},function (err,doc) {
                if(err) console.log(err);
                navObj.datas = doc;
                giftModel.find({},{size:1,shopClass:1,place:1,"_id":0},function (err,doc) {
                    if(err) console.log(err);
                    var sizeArr = [];
                    var shopArr = [];
                    var placeArr = [];
                    for(i in doc){
                        for(var j=0; j<sizeArr.length; j++) {
                            if (doc[i].size == sizeArr[j]) {break;}
                        }
                        if (j == sizeArr.length) {sizeArr.push(doc[i].size);}
                        // shop筛选
                        for(var k=0; k<shopArr.length; k++) {
                            if (doc[i].shopClass == shopArr[k]) {break;}
                        }
                        if (k == shopArr.length) {shopArr.push(doc[i].shopClass);}
                        // palce筛选
                        for(var l=0; l<placeArr.length; l++) {
                            if (doc[i].place == placeArr[l]) {break;}
                        }
                        if (l == placeArr.length) {placeArr.push(doc[i].place);}
                    }
                    navObj.sizeArr = sizeArr;
                    navObj.shopArr = shopArr;
                    navObj.placeArr = placeArr;
                    res.send(navObj);
                })
            })
            break;
    }
})

app.get("/:fruit/screening",function (req,res) {
    var str=decodeURI(req._parsedUrl.pathname);
    word=new RegExp(str.split("/")[1]);
    var data = {};
    var sorts;
    for(i in req.query){
        if(req.query[i] != "全部" && req.query[i] != "默认" && req.query[i] != "价格从低到高" && req.query[i] != "价格从高到低" ){
            data[i] = req.query[i];
        }
    }
    if(req.query.sort == "默认"){
        sorts = "";
    }else if(req.query.sort == "价格从低到高"){
        sorts = {sort:{price:1}}
    }else if(req.query.sort == "价格从高到低"){
        sorts = {sort:{price:-1}}
    }
    if(req._parsedUrl.pathname == "/fruit/screening"){
        fruitModel.find(data,{},sorts,function (err,doc) {
            res.send(doc);
        })
    }else if(req._parsedUrl.pathname == "/fresh/screening"){
        freshModel.find(data,{},sorts,function (err,doc) {
            res.send(doc);
        })
    }else if(req._parsedUrl.pathname == "/gift/screening"){
        giftModel.find(data,{},sorts,function (err,doc) {
            res.send(doc);
        })
    }else if(decodeURI(req._parsedUrl.pathname)==str){
        data.name=word;
        fruitModel.find(data,{},sorts,function (err,doc) {
            res.send(doc);
        })
    }
})

app.get("/shop/:lei/:id",function (req,res) {
    var _id = req.originalUrl.split("/")[3];
    var lei = req.originalUrl.split("/")[2];
    if(lei == "fruit"){
        fruitModel.find({_id:_id},function (err,doc) {
            if(err) console.log(err);
            res.send(doc);
        })
    }else if(lei == "fresh"){
        freshModel.find({_id:_id},function (err,doc) {
            if(err) console.log(err);
            res.send(doc);
        })
    }else if(lei == "gift" ){
        giftModel.find({_id:_id},function (err,doc) {
            if(err) console.log(err);
            res.send(doc);
        })
    }
})

app.get("/load",function (req,res) {

    UserModel.find(req.query,function (err,doc) {
        if(err){
            return console.log(err);
        }
        if(doc.length == 0){
            res.send({status:"0",msg:"用户名或密码错误"})
        }else{
            res.send({status:"1",msg:"登陆成功"})
        }
    })
})

app.get("/regist",function (req,res) {
    // var query=req.body;
    // console.log(query)
    var tel =req.query.tel;
    var pass=req.query.pass;
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

app.get("/cart/:lei/:id/:tel",function (req,res) {
    var _id = req.originalUrl.split("/")[3];
    var lei = req.originalUrl.split("/")[2];
    var tel = req.originalUrl.split("/")[4];

    UserModel.find({tel:tel},{shop:1,_id:0},function (err,doc) {
        if(err) console.log(err);
        var bol = false;
        var index = 0;
        if(doc.length > 0){
            for(i in doc[0].shop){
                if(doc[0].shop[i].id == _id){
                    bol = true;
                    index = i;
                }
            }
        }else{
            bol = true;
        }
        if(bol){
            doc[0].shop[index].num++;
            UserModel.update({tel:tel},{$set:{shop:doc[0].shop}},function (err,doc) {
                if(err) console.log(err);
                UserModel.find({},{shop:1},function (err,doc) {
                    if(err) console.log(err);
                    res.send(doc);
                })
            })
        }else{
            if(lei == "fruit"){
                fruitModel.find({_id:_id},function (err,data) {
                    if(err) console.log(err);
                    doc[0].shop.push({id:_id,num:1,data:data});
                    UserModel.update({tel:tel},{$set:{shop:doc[0].shop}},function (err,doc) {
                        if(err) console.log(err);
                        UserModel.find({},{shop:1},function (err,doc) {
                            if(err) console.log(err);
                            res.send(doc);
                        })
                    })
                })
            }else if(lei == "fresh"){
                freshModel.find({_id:_id},function (err,data) {
                    if(err) console.log(err);
                    doc[0].shop.push({id:_id,num:1,data:data});
                    UserModel.update({tel:tel},{$set:{shop:doc[0].shop}},function (err,doc) {
                        if(err) console.log(err);
                        UserModel.find({},{shop:1},function (err,doc) {
                            if(err) console.log(err);
                            res.send(doc);
                        })
                    })
                })
            }else if(lei == "gift"){
                giftModel.find({_id:_id},function (err,data) {
                    if(err) console.log(err);
                    doc[0].shop.push({id:_id,num:1,data:data});
                    UserModel.update({tel:tel},{$set:{shop:doc[0].shop}},function (err,doc) {
                        if(err) console.log(err);
                        UserModel.find({},{shop:1},function (err,doc) {
                            if(err) console.log(err);
                            res.send(doc);
                        })
                    })
                })
            }
        }
    })

})

app.get("/sp/:tl",function (req,res) {
    var tel = req.originalUrl.split("/")[2];
    UserModel.find({tel:tel},{shop:1},function (err,doc) {
        if(err) console.log(err);
        res.send(doc);
    })
})

app.get("/change/:tel/:ff/:index",function (req,res) {
    var tel = req.originalUrl.split("/")[2];
    var ff = req.originalUrl.split("/")[3];
    var index = req.originalUrl.split("/")[4];
    UserModel.find({tel:tel},function (err,doc) {
        if(err) console.log(err);
        if(ff == "sub"){
            if(doc[0].shop[index].num>1){
                doc[0].shop[index].num--;
            }
            UserModel.update({tel:tel},{$set:{shop:doc[0].shop}},function (err,doc) {
                if(err) console.log(err);
                res.send(doc);
            })
        }else if(ff == "add"){
            doc[0].shop[index].num++;
            UserModel.update({tel:tel},{$set:{shop:doc[0].shop}},function (err,doc) {
                if(err) console.log(err);
                res.send(doc);
            })
        }else if(ff == "del"){
            doc[0].shop.splice(index,1)
            UserModel.update({tel:tel},{$set:{shop:doc[0].shop}},function (err,doc) {
                if(err) console.log(err);
                res.send(doc);
            })
        }
    })
})

app.get("*",function (req,res) {
    res.sendFile("/Users/lanou/Desktop/ttgynode/"+req.path);
})
app.listen(8080);