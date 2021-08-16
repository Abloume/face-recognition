const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const AipFace = require('baidu-aip-sdk').face;
const app = express();

// 百度人脸识别应用的APP_ID、API_KEY、SECRET_KEY
const APP_ID = "xxx";
const API_KEY = "xxxxx";
const SECRET_KEY = "xxxxxx";

const client = new AipFace(APP_ID, API_KEY, SECRET_KEY);

app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  next();
})

app.use('/', function (req, res, next) {
  const { picName, imgUrl: imgData } = req.body || {};
  const image = fs.readFileSync(`avator/${picName}.jpg`);
  const base64Img = Buffer.from(image).toString('base64');
  let base64Data = imgData.replace(/\s/g, "+");
  base64Data = base64Data.replace(/^data:image\/\w+;base64,/, '');
  client.match([{
    image: base64Img,
    image_type: "BASE64"
  }, {
    image: base64Data,
    image_type: "BASE64"
  }]).then((res) => {
    const { score } = (res && res.result) || {};
    if (score) {
      const msg = score < 88 ? '认证失败！' : '认证成功~';
      console.log(msg);
    } else {
      console.log('服务异常...', res)
    }
  });
}).listen(3000, () => {
  console.log('app is listening at port 3000...')
});