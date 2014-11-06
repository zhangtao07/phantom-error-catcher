
var page = require('webpage').create(),
    system = require('system');

//设置20s超时
setTimeout(function(){
    console.log("time out");
    phantom.exit(1);
},20000);

if (system.args.length === 1) {
    console.log("please set url");
    phantom.exit(1);
} else {

    //设置ua，可选
    if(system.args[2]){
        page.settings.userAgent = system.args[2];
    }
    
    //页面地址
    page.address = system.args[1];

    page.onError = function (msg, trace) {

        console.log("page " + page.address + " error:" + msg);
        trace.forEach(function(item) {
            console.log('  ', item.file, ':', item.line);
        })
        phantom.exit();
    }


    page.open(page.address, function (status) {
        if (status !== 'success') {
            console.log('FAIL to load the address');
            phantom.exit();
        } else {   
            console.log("OK");       
            phantom.exit();
        }
    });
}
