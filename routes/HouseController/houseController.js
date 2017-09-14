/**
 * Created by 李帅 on 2017/7/21.
// */
var http = require('http');
var url = require("url");
var qs = require("querystring");
var express=require('express');
var router=express.Router();
var app=express();
var s=require('./../../Http/testHttp');

/*
 *引入
 * */
var logger = require('./../../Http/getToken').tk();

app.set('views','./../views');
var laytpl = require('laytpl');
app.engine('.html', laytpl.__express);
app.set('view engine','html');

/*
 * 房屋添加
 * */
router.post('/houseAdd',function(req,res){
    console.log('aaaaaaa')
    var service=
    {
        serviceName:'houseService',
        methodName:'postHouse',
    }
    var a="";
    //接受数据
    //设置request请求的数据编码。
    req.setEncoding("utf8");
    req.addListener("data",function (postdata) {
        // ..对表单数据进行解码
        var c=decodeURIComponent(postdata);
        var b= qs.parse(c); //转换成json对象
        a = b;
        console.log(a);
    });
    req.addListener('end',function () {
        s.json(req,res,a,service);
    });

});
module.exports = router;