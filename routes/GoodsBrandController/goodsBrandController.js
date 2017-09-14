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

router.get('/index',function(req,res){
    var a={};
    var service={
        serviceName: 'goodsBrandService',
        methodName: 'getGoodsBrand'
    }
    s.json(req, res, a, service);
    setTimeout(function() {
        var g=JSON.stringify(s.dao);
        console.log("test"+g);
        res.render('GoodsBrand/goodsBrand', {
            data: JSON.parse(g)
        });
    },400);
});
router.get('/delete',function(req,res,next){
    var id=req.query.id;
    console.log("aaaaaa"+id);
    var a={mulitId:id}
    var service={
        serviceName: 'goodsBrandService',
        methodName: 'deleteGoodsBrand'
    }
    s.json(req, res, a, service);
    setTimeout(function() {
        var g=JSON.stringify(s.dao);
        console.log("test"+g);
        res.redirect('/goodsBrand/index');
    },400);
});
router.get('/editSequence',function(req,res,next){
    var id=req.query.id;
    var sequence=req.query.value;
    var a={id:id,sequence:sequence,firstWord:'',name:'',recommend:'',showIndex:''}
    var service={
        serviceName: 'goodsBrandService',
        methodName: 'patchGoodsBrand'
    }
    s.json(req, res, a, service);
    setTimeout(function() {
        var g=JSON.stringify(s.dao);
        console.log("test"+g);
        res.redirect('/goodsBrand/index');
    },400);
});
router.get('/editFirstWord',function(req,res,next){
    var id=req.query.id;
    var firstWord=req.query.value;
    var a={id:id,sequence:'',firstWord:firstWord,name:'',recommend:'',showIndex:''}
    var service={
        serviceName: 'goodsBrandService',
        methodName: 'patchGoodsBrand'
    }
    s.json(req, res, a, service);
    setTimeout(function() {
        var g=JSON.stringify(s.dao);
        console.log("test"+g);
        res.redirect('/goodsBrand/index');
    },400);
});
router.get('/editName',function(req,res,next){
    var id=req.query.id;
    var name=req.query.value;
    var a={id:id,sequence:'',firstWord:'',name:name,recommend:'',showIndex:''}
    var service={
        serviceName: 'goodsBrandService',
        methodName: 'patchGoodsBrand'
    }
    s.json(req, res, a, service);
    setTimeout(function() {
        var g=JSON.stringify(s.dao);
        console.log("test"+g);
        res.redirect('/goodsBrand/index');
    },400);
});
router.get('/editRecommend',function(req,res,next){
    var id=req.query.id;
    var a={id:id,sequence:'',firstWord:'',name:'',recommend:0,showIndex:''}
    var service={
        serviceName: 'goodsBrandService',
        methodName: 'patchGoodsBrand'
    }
    s.json(req, res, a, service);
    setTimeout(function() {
        var g=JSON.stringify(s.dao);
        console.log("test"+g);
        res.redirect('/goodsBrand/index');
    },400);
});
router.get('/editShowIndex',function(req,res,next){
    var id=req.query.id;
    var a={id:id,sequence:'',firstWord:'',name:'',recommend:'',showIndex:1}
    var service={
        serviceName: 'goodsBrandService',
        methodName: 'patchGoodsBrand'
    }
    s.json(req, res, a, service);
    setTimeout(function() {
        var g=JSON.stringify(s.dao);
        console.log("test"+g);
        res.redirect('/goodsBrand/index');
    },400);
});

module.exports = router;