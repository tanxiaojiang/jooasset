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
var util = require("util");
var router=express.Router();
var app=express();
var s=require('./../../Http/testHttp');



/*
* 首页
* */
router.get('/index',function(req,res){
    setTimeout(function() {
    res.render('index')
    },300);
})

/*
 * 商品发布一级
 * */
router.get('/goodsClassService',function(req,res){
    var a = {};
    var service =
    {
        serviceName: 'goodsClassService   ',
        methodName: 'getFirstGoodsClass',
    }
    s.json(req, res, a, service);
    setTimeout(function() {
        var g=JSON.stringify(s.dao);
        console.log("test"+g);
        res.render('Goods/goods_publish', {data: JSON.parse(g)});
    },400);
});
/*
 * 规格新增一级
 * */
router.get('/goodsProperty/GetFirst',function(req,res){
    var a = {};
    var service =
    {
        serviceName: 'goodsClassService   ',
        methodName: 'getFirstGoodsClass',
    }
    s.json(req, res, a, service);
    setTimeout(function() {
        var g=JSON.stringify(s.dao);
        console.log("test"+g);
        res.send(JSON.parse(g));
    },400);
});
/*
 * 规格新增二级
 * */
router.get('/goodsProperty/Next',function(req,res){
    var id=req.query.id;
    var a = {id:id};
    var service =
    {
        serviceName: 'goodsClassService   ',
        methodName: 'getNextGoodsClass',
    }
    s.json(req, res, a, service);
    setTimeout(function() {
        var g=JSON.stringify(s.dao);
        console.log("test"+g);
        res.send(JSON.parse(g));
    },400);
});

/*
* 商品发布二级
* */
router.get('/goodsClass/Next',function(req,res,next){
    var id=req.query.id;
    var a = {id: id};
    var service =
    {
        serviceName: 'goodsClassService  ',
        methodName: 'getNextGoodsClass',
    }
    s.json(req, res, a, service);
    setTimeout(function() {
        var g=JSON.stringify(s.dao);
        console.log("test"+g);
        res.send(JSON.parse(g));
    },300);
});
/*
* 商品发布下一步
* */
router.get('/goodsClass/Step',function(req,res,next){
    var gc=req.query.gc.toString();
    var gc_id=req.query.gc_id;
    var a = {classId:gc_id};
    var service =
    {
        serviceName: 'goodsPropertyService',
        methodName: 'getGoodsPropertyListByClass',
    }
    s.json(req, res, a, service);
    setTimeout(function() {
        var g=JSON.stringify(s.dao);
        console.log("test"+g);
        res.render('Goods/goods_publish_next',{data: JSON.parse(g),gcs:gc,gc_ids:gc_id});
    },300);
});
/*
 * 商品发布下一页面
 * */
router.get('/goodsClass/StepPage',function(req,res,next){
    var goodsPropertyId=req.query.goods_propertyOption_ids;
    var goodsPropertyIds=req.query.goods_property_ids
    var a = {goods_property_ids:goodsPropertyIds,goods_propertyOption_ids:goodsPropertyId};
    var service =
    {
        serviceName: 'goodsPropertyOptionService',
        methodName: 'getGoodsSku',
    }
    s.json(req, res, a, service);
    setTimeout(function() {
        var g=JSON.stringify(s.dao);
        console.log("test"+g);
        res.send(JSON.parse(g));
    },300);
});
/*
* 商品发布last
* */
router.post('/goodsClass/StepPage/Last',function(req,res,next){
    var form = new formidable.IncomingForm(), files = [],
        fields = {};
    form.uploadDir=path.normalize(__dirname + '/../../tempUpload/');
    form.parse(req);
    form.on('field', function(field, value) { //处理字段
        fields[field] = value;
    }).on('file', function(field, file) {   //处理文本  field 是上传图片的name的名字
        if( file.size ){
            files[field]=file;
        }
    })

    form.on("end",function(){
        var goodsName=fields.goodsName;
        var goodsPrice=fields.goodsPrice;
        var goodsType=fields.goodsType;
        var goodsCod= fields.goodsCod;
        var storePrice=fields.storePrice;
        var goodsSerial=fields.goodsSerial;
        var current=fields.current;
        var form=current;
        var gc_id=fields.gc_id;
        //文件的别名
        var ttt=sd.format(new Date(),'YYYYMMDDHHmmss');
        var ran=parseInt(Math.random()*89999+100000);
        var extname=files.tupian.name;
        var othername=ttt+ran+extname;
        //得到传照片的路径
        var oldpath=files.tupian.path;

        var newpath=path.normalize(__dirname + '/../../public/images/uploadIamge'+ othername);
        var find= newpath.split("public");
        var pathSubstr=find[1].replace(/ \ /g,"");
        req.post = fields; //字段保存在request.post上, 可以在模板页面使用
        req.files = files; //文件基本信息也保存在request.files上
        fs.rename(oldpath,newpath,function(err){
            if(err){
                throw  err;
            }
        })
        var path1=files.tupian.path;

        var a=
        {
            gc:gc_id,goodsName:goodsName,goodsPrice:goodsPrice,goodsType:goodsType,goodsCod:goodsCod,storePrice:storePrice,goodsSerial:goodsSerial,goodsSkuList: form,qrImgPath:pathSubstr
        };
        var service=
        {
            serviceName:'goodsService',
            methodName:'postGoods',
        };
        s.json(req, res, a, service);

        var g=JSON.stringify(s.dao);
        console.log("test000000"+g);
        res.send("保存成功！");
        //res.render('Goods/shangpin_next');
        //},300);
    });
});

/*
* 规格管理
* */
router.get('/goodsProperty',function(req,res,next){
    var page="";
    console.log("req.query.pageNum："+req.query.pageNum)
    if(req.query.pageNum == undefined){
        page=0;
    }else{
        page=req.query.pageNum;
    }
    var numpage=parseInt(page)+10;
    var curr=parseInt(numpage/10);
        //var a={classId:1};
        var a = {pageNo:page};
        var service =
        {
            serviceName: 'goodsPropertyService ',
            methodName: 'getGoodsProperty',
        }
            s.json(req, res, a, service);
            setTimeout(function() {
                var g=JSON.stringify(s.dao);
                console.log("test"+g);
                res.render('Goods/specification', {
                    data: JSON.parse(g),curr:curr
                });
            },300);
});
/*
* 商品分类新增页面
* */
router.get('/goodsClass/add',function(req,res){
    var id=req.query.id;
    var name=req.query.name;
    if(name==undefined){
        name="";
    }
    setTimeout(function() {
        res.render('Goods/goods_class_new',{data:id,da:name});
    },300);
})
/*
* 商品分类新增提交
* */
router.get('/goodsClass/get',function(req,res,next){
    var name=req.query.name;
    var gcid=req.query.ls;
    var display=req.query.display;
    var recommend=req.query.recommend;
    if(gcid==''){
        gcid=null;
    }
    var a={
        name:name,display:display,recommend:recommend,parentId:gcid
    }
    var service={
        serviceName:'goodsClassService',
        methodName:'postGoodsClass'
    }
    s.json(req, res, a, service);
    setTimeout(function() {
        var g=JSON.stringify(s.dao);
        console.log("test"+g);
        res.render('/admin/goodsClass');
    },300);
})


/*
* 分类管理
* */
router.get('/goodsClass',function(req,res){
    var page="";
    console.log("req.query.pageNum："+req.query.pageNum)
    if(req.query.pageNum == undefined){
        page=0;
    }else{
        page=req.query.pageNum;
    }
    var numpage=parseInt(page)+10;
    var curr=parseInt(numpage/10);
    var a = {pageNo:page};
    var service =
    {
        serviceName: 'goodsClassService ',
        methodName: 'getGoodsClass',

    }
    s.json(req, res, a, service);
    setTimeout(function() {
        var g=JSON.stringify(s.dao);
        console.log("test"+g);
        res.render('Goods/goods_class', {
            data: JSON.parse(g),curr:curr
        });
    },300);
});

/*
 * 商品管理
 * */
router.get('/goods',function(req,res){
    var curr="";
    var limits=req.query.limit;//每页现实的条数
    if( req.query.curr == undefined && req.query.limit== undefined){
        curr=1;
        limits=10;
    }else{
        curr=req.query.curr;
        limits=req.query.limit;
    }
    var a = {curr:curr,limit:limits,goodsStatus:0};//传到后台的当前页，每页显示的条数。商品状态0
    var service =
    {
        serviceName: 'goodsService',
        methodName: 'getGoods',
    }
    s.json(req, res, a, service);
    setTimeout(function() {
        var g=JSON.stringify(s.dao);
        console.log("test"+g);
        res.render('Goods/shop', {
            data: JSON.parse(g),curr:curr
        });
    },400);
});
/*
 * 商品管理在仓库中
 * */
router.get('/goodsNoSell',function(req,res){
    var page="";
    console.log("req.query.pageNum："+req.query.pageNum)
    if(req.query.pageNum == undefined){
        page=0;
    }else{
        page=req.query.pageNum;
    }
    var numpage=parseInt(page)+10;
    var curr=parseInt(numpage/10);
    var a = {goodsStatus:-5,pageNo:page};
    var service =
    {
        serviceName: 'goodsService',
        methodName: 'getGoods',
    }
    s.json(req, res, a, service);
    setTimeout(function() {
        var g=JSON.stringify(s.dao);
        console.log("test"+g);
        res.render('Goods/shop_nosell', {
            data: JSON.parse(g),curr:curr
        });
    },400);
});
/*
 * 商品管理违规下架
 * */
router.get('/goodsDown',function(req,res){
    var page="";
    console.log("req.query.pageNum："+req.query.pageNum)
    if(req.query.pageNum == undefined){
        page=0;
    }else{
        page=req.query.pageNum;
    }
    var numpage=parseInt(page)+10;
    var curr=parseInt(numpage/10);
    var a = {goodsStatus:-2,pageNo:page};
    var service =
    {
        serviceName: 'goodsService',
        methodName: 'getGoods',
    }
    s.json(req, res, a, service);
    setTimeout(function() {
        var g=JSON.stringify(s.dao);
        console.log("test"+g);
        res.render('Goods/shop_down', {
            data: JSON.parse(g),curr:curr
        });
    },400);
});

/*
* 修改商品属性
* */
router.get('/goods/Status',function(req,res,next){
    //var a={classId:1};
    var id=req.query.id;
    var a = {mulitId: id};
    var service =
    {
        serviceName: 'goodsService  ',
        methodName: 'patchGoodsOutLine',
    }
    s.json(req, res, a, service);
    setTimeout(function() {
        var g=JSON.stringify(s.dao);
        console.log("test"+g);
        res.render('/admin/goods');
    },400);
});


/*
 * 规格通过id删除
 * */
router.get('/goodsProperty/delete',function(req,res,next){
    var id=req.query.id;
    var a = {mulitId: id};
    var service =
    {
        serviceName: 'goodsPropertyService  ',
        methodName: 'deleteGoodsProperty',
    }
    s.json(req, res, a, service);
    setTimeout(function() {
        var g=JSON.stringify(s.dao);
        console.log("test"+g);
        res.redirect('/admin/goodsProperty');
    },400);
});
/*
* 编辑
* */
router.get('/goodsProperty/redact', function (req,res,next) {
    var id= req.query.id;
    var a={id:id};
    var service =
    {
        serviceName: 'goodsPropertyService  ',
        methodName: 'getSingleGoodsProperty',
    }
    s.json(req, res, a, service);
    setTimeout(function() {
        var g=JSON.stringify(s.dao);
        console.log("test"+g);
        res.render('Goods/specification_redact', {
            data: JSON.parse(g)
        });
    },400);
});
/*
 * 编辑提交
 * */
router.post('/goodsProperty/update', function (req,res,next) {
    var gcId=req.body.ls;
    var id=req.body.lss;
    var nameForView=req.body.nameForView;
    var remarks=req.body.remarks;
    var serialNumberProperty=req.body.serialNumberProperty;
    var propertyType=req.body.choose;
    var form=JSON.parse(req.body.BestProject_info);
    //console.log(nameForView)
    var a = {gc_id:gcId,goodsProperty:{id:id, nameForView:nameForView,remarks:remarks,serialNumber:serialNumberProperty,propertyType:propertyType },goodsPropertyOptionList:form};
    var service =
    {
        serviceName: 'goodsPropertyService  ',
        methodName: 'putGoodsProperty',
    }
    s.json(req, res, a, service);
    setTimeout(function() {
        var g=JSON.stringify(s.dao);
        console.log("test"+g);
        res.render('Goods/specification', {
            data: JSON.parse(g)
        });
    },400);
});


/*
* 规格通过id修改
* */
router.get('/goodsProperty/edit',function(req,res,next){
    var id=req.query.id;
    var serialNumber=req.query.value;
    //console.log("-----------"+serialNumber)
    var a = {id: id,serialNumber:serialNumber};
    var service =
    {
        serviceName: 'goodsPropertyService  ',
        methodName: 'putGoodsProperty',
    }
    s.json(req, res, a, service);
    setTimeout(function() {
        var g=JSON.stringify(s.dao);
        console.log("test"+g);
        res.redirect('/admin/goodsProperty');
    },400);
});
/*
 * 分类通过id删除
 * */
router.get('/goodsClass/delete',function(req,res,next){
    var id=req.query.id;
    var a = {mulitId: id};
    var service =
    {
        serviceName: 'goodsClassService  ',
        methodName: 'deleteGoodsClass',
    }
    s.json(req, res, a, service);
    setTimeout(function() {
        var g=JSON.stringify(s.dao);
        console.log("test"+g);
        res.redirect('/admin/goodsClass');
    },400);
});
/*
 * 分类通过id修改排序
 * */
router.get('/goodsClass/edit',function(req,res,next){
    var id=req.query.id;
    var sort=req.query.value;
    //console.log("-----------"+sort)
    var a = {id: id,name:'',sort:sort,display:'',recommend:''};
    var service =
    {
        serviceName: 'goodsClassService  ',
        methodName: 'putGoodsClass',
    }
    s.json(req, res, a, service);
    setTimeout(function() {
        var g=JSON.stringify(s.dao);
        console.log("test"+g);
        res.redirect('/admin/goodsClass');
    },400);
});
/*
 * 分类通过id修改显示
 * */
router.get('/goodsClass/editDisplay',function(req,res,next){
    var id=req.query.id;
    var a = {id: id,name:'',sort:'',display:1,recommend:''};
    var service =
    {
        serviceName: 'goodsClassService  ',
        methodName: 'putGoodsClass',
    }
    s.json(req, res, a, service);
    setTimeout(function() {
        var g=JSON.stringify(s.dao);
        console.log("test"+g);
        res.redirect('/admin/goodsClass');
    },400);
});
/*
 * 分类通过id修改推荐
 * */
router.get('/goodsClass/editRecommend',function(req,res,next){
    var id=req.query.id;
    var a = {id: id,name:'',sort:'',display:'',recommend:0};
    var service =
    {
        serviceName: 'goodsClassService  ',
        methodName: 'putGoodsClass',
    }
    s.json(req, res, a, service);
    setTimeout(function() {
        var g=JSON.stringify(s.dao);
        console.log("test"+g);
        res.redirect('/admin/goodsClass');
    },400);
});
/*
 * 分类通过id修改名称
 * */
router.get('/goodsClass/editName',function(req,res,next){
    var id=req.query.id;
    var name=req.query.value;
    var a = {id: id,name:name,sort:'',display:'',recommend:''};
    var service =
    {
        serviceName: 'goodsClassService  ',
        methodName: 'putGoodsClass',
    }
    s.json(req, res, a, service);
    setTimeout(function() {
        var g=JSON.stringify(s.dao);
        console.log("test"+g);
        res.redirect('/admin/goodsClass');
    },400);
});
/*
* 商品管理通过id修改名称
* */
router.get('/goods/edit',function(req,res,next){
    var id=req.query.id;
    var goodsName=req.query.value;
    var a = {id: id,goodsName:goodsName,goodsRecommend:''};
    var service =
    {
        serviceName: 'goodsService   ',
        methodName: 'patchGoods',
    }
    s.json(req, res, a, service);
    setTimeout(function() {
        var g=JSON.stringify(s.dao);
        console.log("test"+g);
        res.redirect('/admin/goods');
    },400);
});
/*
 * 商品管理通过id修改推荐
 * */
router.get('/goods/editGoodsRecommend',function(req,res,next){
    var id=req.query.id;
    var goodsName=req.query.value;
    var a = {id: id,goodsName:'',goodsRecommend:0};
    var service =
    {
        serviceName: 'goodsService   ',
        methodName: 'patchGoods',
    }
    s.json(req, res, a, service);
    setTimeout(function() {
        var g=JSON.stringify(s.dao);
        console.log("test"+g);
        res.redirect('/admin/goods');
    },400);
});

/*
 * 商品管理通过id删除
 * */
router.get('/goods/delete',function(req,res,next){
    var id=req.query.id;
    var a = {mulitId: id};
    var service =
    {
        serviceName: 'goodsService',
        methodName: 'deleteGoods',
    }
    s.json(req, res, a, service);
    setTimeout(function() {
        var g=JSON.stringify(s.dao);
        console.log("test"+g);
        res.redirect('/admin/goods');
    },400);
});
/*
 * 商品管理仓库中通过id修改名称
 * */
router.get('/goodsNoSell/edit',function(req,res,next){
    var id=req.query.id;
    var goodsName=req.query.value;
    var a = {id: id,goodsName:goodsName,goodsRecommend:''};
    var service =
    {
        serviceName: 'goodsService   ',
        methodName: 'patchGoods',
    }
    s.json(req, res, a, service);
    setTimeout(function() {
        var g=JSON.stringify(s.dao);
        console.log("test"+g);
        res.redirect('/admin/goodsNoSell');
    },400);
});
/*
 * 商品管理仓库中商品通过id删除
 * */
router.get('/goodsNoSell/delete',function(req,res,next){
    var id=req.query.id;
    var a = {mulitId: id};
    var service =
    {
        serviceName: 'goodsService',
        methodName: 'deleteGoods',
    }
    s.json(req, res, a, service);
    setTimeout(function() {
        var g=JSON.stringify(s.dao);
        console.log("test"+g);
        res.redirect('/admin/goodsNoSell');
    },400);
});
/*
 * 商品管理仓库中商品通过id上架
 * */
router.get('/goodsNoSell/putaway',function(req,res,next){
    var id=req.query.id;
    var a = {mulitId: id,goodsStatus:0};
    var service =
    {
        serviceName: 'goodsService',
        methodName: 'patchGoodsOutLine',
    }
    s.json(req, res, a, service);
    setTimeout(function() {
        var g=JSON.stringify(s.dao);
        console.log("test"+g);
        res.redirect('/admin/goodsNoSell');
    },400);
});
/*
 * 商品管理违规下架通过id修改名称
 * */
router.get('/goodsDown/edit',function(req,res,next){
    var id=req.query.id;
    var goodsName=req.query.value;
    var a = {id: id,goodsName:goodsName,goodsRecommend:''};
    var service =
    {
        serviceName: 'goodsService   ',
        methodName: 'patchGoods',
    }
    s.json(req, res, a, service);
    setTimeout(function() {
        var g=JSON.stringify(s.dao);
        console.log("test"+g);
        res.redirect('/admin/goodsDown');
    },400);
});
/*
 * 商品管理违规下架商品通过id删除
 * */
router.get('/goodsDown/delete',function(req,res,next){
    var id=req.query.id;
    var a = {mulitId: id};
    var service =
    {
        serviceName: 'goodsService',
        methodName: 'deleteGoods',
    }
    s.json(req, res, a, service);
    setTimeout(function() {
        var g=JSON.stringify(s.dao);
        console.log("test"+g);
        res.redirect('/admin/goodsDown');
    },400);
});
/*
* 规格新增
* */
router.post('/goodsProperty/add',function(req,res,next){
    var gcId=req.body.ls;
    var nameForView=req.body.nameForView;
    var remarks=req.body.remarks;
    var serialNumberProperty=req.body.serialNumberProperty;
    var propertyType=req.body.choose;
    var form=JSON.parse(req.body.BestProject_info);
    //console.log(nameForView)
    var a = {gc_id:gcId,goodsProperty:{ nameForView:nameForView,remarks:remarks,serialNumber:serialNumberProperty,propertyType:propertyType },goodsPropertyOptionList:form};
    var service =
    {
        serviceName: 'goodsPropertyService ',
        methodName: 'postGoodsProperty',
    }
    s.json(req, res, a, service);
    setTimeout(function() {
        var g=JSON.stringify(s.dao);
        console.log("test"+g);
        res.redirect('/admin/goodsProperty');
    },400);
});







/*
* sku管理
* */
router.get('/goodsSku',function(req,res,next){
    var page="";
    console.log("req.query.pageNum："+req.query.pageNum)
    if(req.query.pageNum == undefined){
        page=0;
    }else{
        page=req.query.pageNum;
    }
    var numpage=parseInt(page)+10;
    var curr=parseInt(numpage/10);
    var a = {pageNo:page};
    var service =
    {
        serviceName: 'goodsSkuService',
        methodName: 'getGoodsSku',
    }
    s.json(req, res, a, service);
    setTimeout(function() {
        var g=JSON.stringify(s.dao);
        console.log("test"+g);
        res.render('Goods/goods_sku', {
            data: JSON.parse(g),curr:curr
        });
    },400);
});
/*
 * sku通过id删除
 * */
router.get('/goodsSku/delete',function(req,res,next){
    var id=req.query.id;
    var a = {mulitId: id};
    var service =
    {
        serviceName: 'goodsSkuService  ',
        methodName: 'deleteGoodsSku',
    }
    s.json(req, res, a, service);
    setTimeout(function() {
        var g=JSON.stringify(s.dao);
        console.log("test"+g);
        res.redirect('/admin/goodsSku');
    },400);
});
/*
* 查看sku详细情况
* */
router.post('/goodsSku/Check',function(req,res,next){
    var id=req.body.id;
    var a = {id: id};
    var service =
    {
        serviceName: 'goodsSkuService  ',
        methodName: 'getSingleGoodsSku',
    }
    s.json(req, res, a, service);
    setTimeout(function() {
        var g=JSON.stringify(s.dao);
        console.log("test"+g);
        res.render('Goods/sku_check',{
            data: JSON.parse(g)
        });
    },300);
});
/*
 * 修改sku详细情况
 * */
router.post('/goodsSku/Change',function(req,res,next){
    var id=req.body.id;
    var a = {id: id};
    var service =
    {
        serviceName: 'goodsSkuService  ',
        methodName: 'getSingleGoodsSku',
    }
    s.json(req, res, a, service);
    setTimeout(function() {
        var g=JSON.stringify(s.dao);
        console.log("test"+g);
        res.render('Goods/sku_change',{
            data: JSON.parse(g)
        });
    },300);
});
/*
 * 修改sku
 * */
router.post('/goodsSku/ChangeSend',function(req,res,next){
    var id =req.body.id;
    var goodsId=req.body.goodsId;
    var name= req.body.name;
    var skuDescribe= req.body.skuDescribe;
    var currentPrice=req.body.currentPrice;
    var currentInventory=req.body.currentInventory;
    var code=req.body.code;
    var a = {id:id,goodsId: goodsId,name:name,skuDescribe:skuDescribe,currentPrice:currentPrice,currentInventory:currentInventory,code:code};
    var service =
    {
        serviceName: 'goodsSkuService  ',
        methodName: 'putGoodsSku',
    }
    s.json(req, res, a, service);
    setTimeout(function() {
        var g=JSON.stringify(s.dao);
        console.log("test"+g);
        res.redirect('/admin/goodsSku');
    },300);
});
/*
* 分类管理下拉选项获取
* */
router.post('/goodsClassNextLoad',function(req,res,next){
    var id=req.body.id;
    var a = {id: id};
    var service =
    {
        serviceName: 'goodsClassService ',
        methodName: 'getNextGoodsClass',

    }
    s.json(req, res, a, service);
    setTimeout(function() {
        var g=JSON.stringify(s.dao);
        console.log("test"+g);
        res.render('Goods/goodsClassNextLoad',{
            data: JSON.parse(g)
        });
    },300);
});
module.exports = router;