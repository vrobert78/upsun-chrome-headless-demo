const parseUrl = require('parse_url');
const platformsh = require('platformsh-config');
const fs = require('fs');


let config = platformsh.config();

const credentials = config.credentials('chrome');

var express = require('express');

var data = {};

let examples = {
    pdfs: 'PDFs',
    screenshots: 'Screenshots',
};

Object.keys(examples).forEach((key) => {
    data[key] = require(`./examples/${key}.js`);
    data[key].source = escapeHtml(fs.readFileSync(`./examples/${key}.js`, 'utf8'));
    data[key].label = examples[key];
});

function escapeHtml(s) {
    return s.replace(/[^0-9A-Za-z ]/g, function(c) {
        return "&#" + c.charCodeAt(0) + ";";
    });
}

var app = express()

app.get('/', (req, res) => {
  res.writeHead(200, {"Content-Type": "text/html"});
  res.write(`<html>
<head>
    <title>Headless Chrome on Platform.sh</title>
</head>
<body>
<h1>Headless Chrome on Platform.sh</h1>

<a href="/relationship">Relationship</a>


<h2>Usage examples</h2>

<h3>Take a Screenshot of a page</h3>

<form action="/examples/screenshots.js">
url: <input type="text" name="urlScreenshot"><input type="submit" value="Submit">
</form>

<ul>
  <li><a href="/screenshots/source">Source</a></li>
</ul>

<h3>Make a PDF copy of a page</h3>

<form action="/examples/pdfs.js">
url: <input type="text" name="urlPDF"><input type="submit" value="Submit">
</form>

<ul>
  <li><a href="/pdfs/source">Source</a></li>
</ul>
`);
    res.end(`</body></html>`);
})


app.get('/relationship', (req, res) => {
  res.writeHead(200, {"Content-Type": "text/html"});
  res.end("<html><head><title>Relationship</title></head><body><pre>"+JSON.stringify(credentials, null, 4) + "</pre></body></html>");
})


app.get('/test', (req, res) => {
  res.send('Another page!')
})

app.get('/screenshots', (req, res) => {
  res.send('Lorem ipsum')
})

app.get('/screenshots/source', (req, res) => {
  res.write(data['screenshots'].source)
})


// Start the server.
app.listen(config.port, function() {
    console.log(`Listening on port ${config.port}`)
});
