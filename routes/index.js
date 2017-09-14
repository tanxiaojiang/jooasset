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

app.set('views','./../views');
var laytpl = require('laytpl');
app.engine('.html', laytpl.__express);
app.set('view engine','html');

app.use('/house',houseController);


router.get('/goods',goodsController);



app.use(express.static(path.join(__dirname, 'public')));
module.exports = router;