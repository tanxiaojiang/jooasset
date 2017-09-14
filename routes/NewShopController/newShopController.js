/**
 * Created by 李帅 on 2017/9/4.
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
 * 首页
 * */
router.get('/index',function(req,res){
    setTimeout(function() {
        res.render('shopIndex')
    },300);
})
router.get('/newShopIndex',function(req,res){
    setTimeout(function() {
        res.render('NewShop/newShopIndex')
    },300);
})
router.get('/clear',function(req,res){
    var ids=req.query.ids;
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
        res.render('NewShop/newShopClear', {
            data: JSON.parse(g),ids:ids
        });
    },300);
});
router.get('/details',function(req,res,next){
    var id = req.query.id;
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
        res.render('NewShop/newShopDetails', {
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
 * 购买
 * */
router.post('/shopBuy',function(req,res){
    var skuid=req.body.skuid;
    var price=req.body.price;
    var number=req.body.number;
    var a = {skuid:skuid,count:number,price:price};
    var service =
    {
        serviceName: 'goodsCartService',
        methodName: '',
    }
    s.json(req, res, a, service);
    setTimeout(function() {
        var g=JSON.stringify(s.dao);
        console.log("test"+g);
        res.send(JSON.parse(g));
    },300);
});
/*
* 购物车页面
* */
router.get('/Cart',function(req,res,next){
    var a={}
    var service={
        serviceName: 'goodsCartService',
        methodName: 'getGoodsCart',
    }
    s.json(req, res, a, service);
    setTimeout(function() {
        var g=JSON.stringify(s.dao);
        console.log("test"+g);
        res.render('NewShop/newShopCart', {
            data: JSON.parse(g)
        });
    },300);
});
/*
* 购物车获取价格
* */
router.get('/cartPrice',function(req,res,next){
    var id=req.query.id;
    var count=req.query.count;
    var gcs=req.query.gcs;
    var a={cartId:id,count:count,gcs:gcs};
    var service={
        serviceName: 'goodsCartService',
        methodName: 'putGoodsCart',
    }
    s.json(req, res, a, service);
    setTimeout(function() {
        var g=JSON.stringify(s.dao);
        console.log("test"+g);
        res.send(JSON.parse(g));
    },300);
});
/*
 * 购物车删除
 * */
router.get('/cartDelete',function(req,res,next){
    var gcs=req.query.gcs;
    var a={mulitId:gcs};
    var service={
        serviceName: 'goodsCartService',
        methodName: 'deleteGoodsCart',
    }
    s.json(req, res, a, service);
    setTimeout(function() {
        var g=JSON.stringify(s.dao);
        console.log("test"+g);
        res.redirect('/newShop/cart');
    },300);
});
/*
 * 购物车支付
 * */
router.get('/Pay',function(req,res,next){
    var gcs=req.query.gcs;
    var a={gcs:gcs};
    var service={
        serviceName: 'goodsViewService',
        methodName: 'getOrderConfirm',
    }
    s.json(req, res, a, service);
    setTimeout(function() {
        var g=JSON.stringify(s.dao);
        console.log("testcs====="+g);
        res.render('NewShop/newShopPay', {
            data: JSON.parse(g)
        });
    },300);
});
module.exports = router;