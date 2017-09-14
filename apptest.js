/**
 * Created by 李帅 on 2017/7/25.
 */
var express=require('express')
var port=process.env.PORT || 3000
var app=express()

app.set('views','./views')
var laytpl = require('laytpl');
app.engine('.html', laytpl.__express);
app.set('view engine','html')
app.listen(port);

console.log('imooc started on port '+port);

//index page
app.get('/',function(req,res){
    res.render('houseForm2',{
        title:'imooc 首页'
    })
})
//detail page
app.get('/movie/:id',function(req,res){
    res.render('index',{
        title:'imooc 详情'
    })
})
//admin page
app.get('/admin/movie',function(req,res){
    res.render('admin',{
        title:'imooc 后台录入页'
    })
})
//list page
app.get('/admin/list',function(req,res){
    res.render('list',{
        title:'imooc 列表页'
    })
})