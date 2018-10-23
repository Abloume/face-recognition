var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
var AipFace = require('baidu-aip-sdk').face;
var app = express();

var APP_ID = "11679908";
var API_KEY = "QWguwZ1bvTNwCnHVlGsEB9M5";
var SECRET_KEY = "AfVw4SIr5PdrEE7ww7IMUrsT53WbkdgN";

var client = new AipFace(APP_ID, API_KEY, SECRET_KEY);

app.use(bodyParser.urlencoded({extended:true,limit:'50mb'}))
app.all('*',function(req,res,next){
    res.header('Access-Control-Allow-Origin','*');
    next();
})

app.use('/',function(req,res){
    var picName = req.body.picName;
    var image = fs.readFileSync(`avator/${picName}.jpg`);
    var base64Img = new Buffer(image).toString('base64');
    var imgData = req.body.imgUrl;
    var base64Data = imgData.replace(/\s/g,"+");
    base64Data = base64Data.replace(/^data:image\/\w+;base64,/,'');
    client.match([{
            image:base64Img,
            image_type:"BASE64"
        },{
            image:base64Data,
            image_type:"BASE64"
        }]).then(function(result){
            if(result.result.score<88)
                console.log('认证失败！')
            else
                console.log('认证成功~')
            });
}).listen(3000, ()=>{
    console.log('app is listening at port 3000...')
});