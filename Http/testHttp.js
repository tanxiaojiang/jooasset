/**
 * Created by 李帅 on 2017/7/20.
 */
var express = require('express');
var http = require('http');
var qs = require('querystring');
var router=express.Router();

var data=
{
    serviceName:'',
    methodName:'',
        parameters:{

    }
}

var options = {
    hostname:'192.168.2.199',
    port:'8090',
    path:'/',
    method:'POST',
    headers: {
        'token':'',
        "Content-Type": 'application/json; charset=utf-8'
    }
};

exports.json=function(res,req,a,service) {
    var sqlMsg = '';
    data['parameters'] = a;
    data['serviceName'] = service.serviceName;
    data['methodName'] = service.methodName;
    //console.log("op:"+ JSON.stringify(options));
    //console.log('data:'+JSON.stringify(data));
    var req = http.request(options, function (res) {
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));
        var chunks = [];
        var size = 0;
        res.setEncoding('utf8');
        if (res.statusCode == 200) {
            res.on('data', function (chunk) {
                chunks.push(chunk);
                //console.log('chunk----'+chunk);
                size += chunk.length
            });
            res.on('end', function () {
                //console.log('响应结束');
                //console.log('size----'+size);
                var data = '';
                switch(chunks.length) {
                    case 0: data = new Buffer(0);
                        break;
                    case 1: data = chunks[0];
                        break;
                    default:
                        for (var i = 0, l = chunks.length; i < l; i++) {
                            //console.log('i--------------:'+chunks[i]);
                            data += chunks[i];
                        }
                        break;
                }
                //console.log('BODY buffer: ' + data.toString('utf-8'));
                //console.log('数据获取结束');
                sqlMsg = JSON.parse(data);
                console.log('BODY: ' + JSON.stringify(data));
                exports.dao = sqlMsg;
            });
        }else{
            req.on('error', function (e) {
                console.error('请求遇到问题:Express');
            });
        }

    });
    console.log('p:'+JSON.stringify(data));
    req.write(JSON.stringify(data));
    req.end();
 };

exports.tk=function(){
    return options;
}

exports.tkp=function(op){
    options = op;
}


