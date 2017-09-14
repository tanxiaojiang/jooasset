/**
 * Created by 李帅 on 2017/8/23.
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
 * 订单页面
 * */
router.get('/index',function(req,res){
    var page="";
    console.log("req.query.pageNum："+req.query.pageNum)
    if(req.query.pageNum == undefined){
        page=0;
    }else{
        page=req.query.pageNum;
    }
    var numpage=parseInt(page)+10;
    var curr=parseInt(numpage/10);
    var a = {pagenum:page,orderStatus:-1};
    var service =
    {
        serviceName: 'orderFormService',
        methodName: 'getOrderform',
    }
    s.json(req, res, a, service);
    setTimeout(function() {
        var g=JSON.stringify(s.dao);
        console.log("test"+g);
        res.render('Order/order', {
            data: JSON.parse(g),curr:curr
        });
    },300);
});
/*
 * 订单发货
 * */
router.get('/orderSend',function(req,res){
    var page="";
    console.log("req.query.pageNum："+req.query.pageNum)
    if(req.query.pageNum == undefined){
        page=0;
    }else{
        page=req.query.pageNum;
    }
    var numpage=parseInt(page)+10;
    var curr=parseInt(numpage/10);
    var a = {pagenum:page,orderStatus:2};
    var service =
    {
        serviceName: 'orderFormService',
        methodName: 'getOrderform',
    }
    s.json(req, res, a, service);
    setTimeout(function() {
        var g=JSON.stringify(s.dao);
        console.log("test"+g);
        res.render('Order/order_send', {
            data: JSON.parse(g),curr:curr
        });
    },300);
});
/*
 * 订单评价
 * */
router.get('/orderAssessment',function(req,res){
    var page="";
    console.log("req.query.pageNum："+req.query.pageNum)
    if(req.query.pageNum == undefined){
        page=0;
    }else{
        page=req.query.pageNum;
    }
    var numpage=parseInt(page)+10;
    var curr=parseInt(numpage/10);
    var a = {pagenum:page,orderStatus:3};
    var service =
    {
        serviceName: 'orderFormService',
        methodName: 'getOrderform',
    }
    s.json(req, res, a, service);
    setTimeout(function() {
        var g=JSON.stringify(s.dao);
        console.log("test"+g);
        res.render('Order/order_assessment', {
            data: JSON.parse(g),curr:curr
        });
    },300);
});

/*
 * 订单完成
 * */
router.get('/orderComplete',function(req,res){
    var page="";
    console.log("req.query.pageNum："+req.query.pageNum)
    if(req.query.pageNum == undefined){
        page=0;
    }else{
        page=req.query.pageNum;
    }
    var numpage=parseInt(page)+10;
    var curr=parseInt(numpage/10);
    var a = {pagenum:page,orderStatus:4};
    var service =
    {
        serviceName: 'orderFormService',
        methodName: 'getOrderform',
    }
    s.json(req, res, a, service);
    setTimeout(function() {
        var g=JSON.stringify(s.dao);
        console.log("test"+g);
        res.render('Order/order_complete', {
            data: JSON.parse(g),curr:curr
        });
    },300);
});
/*
 * 订单取消
 * */
router.get('/orderCancel',function(req,res){
    var page="";
    console.log("req.query.pageNum："+req.query.pageNum)
    if(req.query.pageNum == undefined){
        page=0;
    }else{
        page=req.query.pageNum;
    }
    var numpage=parseInt(page)+10;
    var curr=parseInt(numpage/10);
    var a = {pagenum:page,orderStatus:5};
    var service =
    {
        serviceName: 'orderFormService',
        methodName: 'getOrderform',
    }
    s.json(req, res, a, service);
    setTimeout(function() {
        var g=JSON.stringify(s.dao);
        console.log("test"+g);
        res.render('Order/order_cancel', {
            data: JSON.parse(g),curr:curr
        });
    },300);
});
/*
 * 订单提交
 * */
router.get('/orderSubmit',function(req,res){
    var page="";
    console.log("req.query.pageNum："+req.query.pageNum)
    if(req.query.pageNum == undefined){
        page=0;
    }else{
        page=req.query.pageNum;
    }
    var numpage=parseInt(page)+10;
    var curr=parseInt(numpage/10);
    var a = {pagenum:page,orderStatus:0};
    var service =
    {
        serviceName: 'orderFormService',
        methodName: 'getOrderform',
    }
    s.json(req, res, a, service);
    setTimeout(function() {
        var g=JSON.stringify(s.dao);
        console.log("test"+g);
        res.render('Order/order_submit', {
            data: JSON.parse(g),curr:curr
        });
    },300);
});
/*
 * 订单付款
 * */
router.get('/orderPay',function(req,res){
    var page="";
    console.log("req.query.pageNum："+req.query.pageNum)
    if(req.query.pageNum == undefined){
        page=0;
    }else{
        page=req.query.pageNum;
    }
    var numpage=parseInt(page)+10;
    var curr=parseInt(numpage/10);
    var a = {pagenum:page,orderStatus:1};
    var service =
    {
        serviceName: 'orderFormService',
        methodName: 'getOrderform',
    }
    s.json(req, res, a, service);
    setTimeout(function() {
        var g=JSON.stringify(s.dao);
        console.log("test"+g);
        res.render('Order/order_pay', {
            data: JSON.parse(g),curr:curr
        });
    },300);
});
router.post('/orderChange',function(req,res,next){
    var orderId=req.body.orderId;
    var goodsAmount=req.body.goodsAmount;
    var shipPrice= req.body.shipPrice;
    var userName = req.body.userName;
    var num =req.body.num;
    var totalPrice=parseFloat(goodsAmount)+parseFloat(shipPrice);
    var id = req.body.id;
    setTimeout(function(){
        res.render('Order/order_change',{orderId:orderId,totalPrice:totalPrice,shipPrice:shipPrice,userName:userName,id:id,goodsAmount:goodsAmount,num:num})
    })
})
router.get('/orderChangeSend',function(req,res,next){
     var num='';
    if(req.query.num==1){
        num='/order/orderSubmit';
    }
    if(req.query.num==2){
        num='/order/index'
    }
    console.log(num)
    var goodsAmount=req.query.goodsAmount;
    var shipPrice = req.query.shipPrice;
    var id = req.query.id;
    var totalPrice=req.query.totalPrice;
    var a = {goodsAmount:goodsAmount,shipPrice:shipPrice,oId:id,totalPrice:totalPrice};
    var service =
    {
        serviceName: 'orderFormService',
        methodName: 'patchOrderFeeSave',
    }
    s.json(req, res, a, service);
    setTimeout(function() {
        var g=JSON.stringify(s.dao);
        console.log("test"+g);
            res.redirect(num);
    },300);
});

router.post('/orderOff', function (req,res,next) {
    var orderId=req.body.orderId;
    var id = req.body.id;
    var num=req.body.num;
    setTimeout(function(){
        res.render('Order/order_off',{orderId:orderId,id:id,num:num})
    })
})
router.get('/orderOffSend',function(req,res,next){
    var num='';
    if(req.query.num==1){
        num='/order/orderSubmit';
    }
    if(req.query.num==2){
        num='/order/index'
    }
    console.log(num)
    var stateInfo=req.query.stateInfo;
    var id = req.query.id;
    var otherStateInfo=req.query.otherStateInfo;
    var a = {stateInfo:stateInfo,oId:id,otherStateInfo:otherStateInfo};
    var service =
    {
        serviceName: 'orderFormService',
        methodName: 'patchOrderCancelSave',
    }
    s.json(req, res, a, service);
    setTimeout(function() {
        var g=JSON.stringify(s.dao);
        console.log("test"+g);
        res.redirect(num);
    },300);
});
router.post('/orderAffirm', function (req,res,next) {
    var orderId=req.body.orderId;
    var id = req.body.id;
    var num=req.body.num;
    var a={oId:id}
    var service={
        serviceName: 'orderFormService',
        methodName: 'patchOrderShopping',
    }
    s.json(req, res, a, service);
    setTimeout(function() {
        var g=JSON.stringify(s.dao);
        console.log("test"+g);
        res.redirect('Order/order_affirm',{
            data: JSON.parse(g),id:id,num:num,orderId:orderId
        });
    },300);
});
router.get('/orderPrint',function(req,res,next){
    var id=req.query.id;
    var a={oId:id}
    var service={
        serviceName: 'orderFormService',
        methodName: 'getOrderPrit'
    }
    s.json(req, res, a, service);
    setTimeout(function() {
        var g=JSON.stringify(s.dao);
        console.log("test"+g);
        //res.redirect('Order/order_print',200);
        res.render('Order/order_print',{
            data: JSON.parse(g)
        });
    },300);
});
module.exports = router;