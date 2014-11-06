
var async = require("async"),
	logSymbols = require('log-symbols'),
    exec = require('child_process').exec,
	conf = require("./conf/config.js");

//各终端示例ua
var ua_list = {
    'chrome' : "Mozilla/5.0 (Windows NT 6.2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1847.116 Safari/537.36",
    'iphone' : "Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_3_2 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8H7 Safari/6533.18.5",
    'android' : "Mozilla/5.0 (Linux; U; Android 2.3; en-us) AppleWebKit/999+ (KHTML, like Gecko) Safari/999.9"
};


var count = 0,
    suc = 0, //成功数
    err = 0, //错误页面数
    pages = conf.pages;


async.whilst(
    function() {
        return count < pages.length;
    },
    function(cb) {
    	var obj = pages[count];
        var url = obj['url'];
        var ua = ua_list[obj['ua']] || ua_list['chrome']; //phantomjs ua，可选
        var cmd = "phantomjs lib/catcher.js " +" '" + url + "' '" + ua + "' " ;
        //console.log(cmd);
        count++;      
        exec(cmd, function(error, stdout, stderr) { 
            if(!error){
                if(String(stdout).indexOf("OK") != 0){
                    err++;
                    console.log(logSymbols.error,  '【ERROR】 ' + url + "\n" + stdout); 
                }else{
                    suc++;
                    console.log(logSymbols.success,  url + ' is OK');
                }
            }else{
                err++;
            	console.log(logSymbols.warning, '【ERROR】 ' + url + "\n" +error);
            }
            cb();
        });               
    },
    function(error) {
        console.log("\n Done --------------------------------------");
        console.log("【TOTAL】:" + pages.length + " 【SUCCESS】:" + suc + " 【FAIL】:" + err);
        process.exit();
    }
);