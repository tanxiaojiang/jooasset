/**
 * Created by 李帅 on 2017/7/20.
 */
var http = require('http');
var url = require("url");
var path = require('path');
var qs = require("querystring");
var express=require('express');
var router=express.Router();
var app=express();
var houseController=require('./HouseController/houseController');
var goodsController=require('./GoodsController/goodsController');
/*
*引入
* */
var logger = require('./../Http/getToken').tk();

//app.set('views','./../views');
var laytpl = require('laytpl');
app.engine('.html', laytpl.__express);
app.set('view engine','html');

app.use('/house',houseController);
app.use('/goods',goodsController);


app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
   res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
           str="<h1>欢迎</h1><a href='/Goods/nav'>点击填写信息</a>";
   res.write(str);
   res.end();
})


var server = app.listen(8888, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

});
module.exports = router;