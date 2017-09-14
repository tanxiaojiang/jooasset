/**
 * Created by 李帅 on 2017/7/26.
 */
var http = require('http');
var url = require("url");
var qs = require("querystring");
var express=require('express');
var formidable = require('formidable');
var sd = require("silly-datetime");
var fs = require("fs");
var path = require("path");
var router=express.Router();
var app=express();
var s=require('./../../Http/testHttp');


/*
 * 商城页面
 * */
router.get('/index',function(req,res){
    var a = {};
    var service =
    {
        serviceName: 'goodsViewService',
        methodName: 'getGoodsForViewList',
    }
    s.json(req, res, a, service);
    setTimeout(function() {
        var g=JSON.stringify(s.dao);
        console.log("test"+g);
        res.render('Shop/shopIndex', {
            data: JSON.parse(g)
        });
    },300);
});
/*
 * 商城页面
 * */
router.get('/shopClear',function(req,res){
    var id=req.query.id;
    console.log(id);
    var a = {id:id};
    var service =
    {
        serviceName: 'goodsViewService',
        methodName: 'getGoodsForView',
    }
    s.json(req, res, a, service);
    setTimeout(function() {
        var g=JSON.stringify(s.dao);
        console.log("test"+g);
        res.render('Shop/shopClear', {
            data: JSON.parse(g)
        });
    },300);
});
/*
 * 获取价格
 * */
router.get('/goodsPrice',function(req,res){
    var ids=req.query.goodsSku;
    var goodsId=req.query.goodsId;
    var classId=req.query.classId;
    var a = {ids:ids,goodsId:goodsId,classId:classId};
    var service =
    {
        serviceName: 'goodsViewService',
        methodName: 'getGoodsPriceInventory',
    }
    s.json(req, res, a, service);
    setTimeout(function() {
        var g=JSON.stringify(s.dao);
        console.log("test"+g);
        res.send(JSON.parse(g));
    },300);
});
/*
 * 添加至购物车
 * */
router.post('/shopCar',function(req,res){
    var skuid=req.body.skuid;
    var price=req.body.price;
    var number=req.body.number;
    var a = {skuid:skuid,count:number,price:price};
    var service =
    {
        serviceName: 'goodsCartService',
        methodName: 'postGoodsCart',
    }
    s.json(req, res, a, service);
    setTimeout(function() {
        var g=JSON.stringify(s.dao);
        console.log("test"+g);
        res.send(JSON.parse(g));
    },300);
});
/*
 * 立即支付
 * */
router.post('/shopBuy',function(req,res){
    var skuid=req.body.skuid;
    var price=req.body.price;
    var number=req.body.number;
    console.log("aaaaa"+skuid+"bbbb"+price+"ccccc"+number);
    var a = {skuid:skuid,count:number,price:price};
    var service =
    {
        serviceName: '',
        methodName: '',
    }
    s.json(req, res, a, service);
    setTimeout(function() {
        var g=JSON.stringify(s.dao);
        console.log("test"+g);
        res.send(JSON.parse(g));
    },300);
});

module.exports = router;