// Load the http module to create an http server.
var http = require('http');

// Load the Platform.sh configuration.
var config = require("platformsh").config();
//var credentials = config.credentials('chrome');

var server = http.createServer(function (request, response) {
  response.writeHead(200, {"Content-Type": "text/html"});
  response.end("<html><head><title>Hello node</title></head><body><h1><img src='public/js.png'>Hello Headless Chrome</h1><h3>Platform configuration:</h3><pre>"+JSON.stringify(config, null, 4) + "</pre></body></html>");
});

//var server = http.createServer(function (request, response) {
//  response.writeHead(200, {"Content-Type": "text/html"});
//  response.end("<html><head><title>Hello node</title></head><body><h1>Hello Headless Chrome</h1><h3>Platform configuration:</h3><pre>"+JSON.stringify(credentials, null, 4) + "</pre></body></html>");
//});

server.listen(config.port);