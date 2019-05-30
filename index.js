const parseUrl = require('parse_url');
const platformsh = require('platformsh-config');

let config = platformsh.config();

var express = require('express')

var app = express()

app.get('/', (req, res) => {
  res.writeHead(200, {"Content-Type": "text/html"});
//  res.send('Hello World! <a href="/test">Test page</a>')
  res.write(`<html>
<head>
    <title>Platform.sh Headless Chrome usage examples</title>
</head>
<body>
<h1>Usage examples for Headless Chrome</h1>
<ul>
  <li><a href="/test">Test page</a></li>
  <li><a href="/test">Test page</a></li>
  <li><a href="/test">Test page</a></li>
</ul>
`);
    res.end(`</body></html>`);
})

app.get('/test', (req, res) => {
  res.send('Another page!')
})

// Start the server.
app.listen(config.port, function() {
    console.log(`Listening on port ${config.port}`)
});
