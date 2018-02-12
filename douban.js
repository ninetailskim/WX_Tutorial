var http = require("http");
var https = require("https");
var url = require("url");
var APP_URL = "";
var server = http.createServer(function(request, response){
    var params = url.parse(request.url, true).query;
    APP_URL = params.APP_URL;
    console.log(APP_URL);
    https.get(APP_URL, function(res){
        var html = ''
        res.on('data', function(data){
            html += data;
        })

        res.on('end', function(){
            response.writeHead(200, {'Content-Type':'text/plain'});
            response.end(html);
        })  
    }).on('error', function(){
        console.log("error");
        console.log(APP_URL);
    })
}).listen(8888);

console.log('server running at http://127.0.0.1:8888/');