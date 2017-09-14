/**
 * Created by 李帅 on 2017/7/25.
 */
var express = require('express');
var http = require('http');
var qs = require('querystring');
var tokens='';
/**
 *接口名称：serviceName
 * 调用方法：methodName
 */
var data=
{
    serviceName:'authService',
    methodName:'getToken'

};
/**
 * 配置参数，ip,端口号，路径，传递方式，header：获得的token
 */
var options = {
    hostname:'192.168.2.199',
    port:'8090',
    path:'/',
    method:'POST',
    headers: {
        'token':''
    }
};

var req =http.request(options,function(res){
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        tokens = JSON.parse(chunk);
        var a = require('./testHttp').tk();
        a.headers.token = tokens.access_token;
        require('./testHttp').tkp(a);
        console.log('access_token:' + tokens.access_token);
    });
});

req.write(JSON.stringify(data));
req.end();

exports.tk=function(){
    return tokens;
}

