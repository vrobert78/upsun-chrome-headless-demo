const parseUrl = require('parse_url');
const platformsh = require('platformsh-config');
const fs = require('fs');


let config = platformsh.config();

const credentials = config.credentials('headless');

var express = require('express');

var data = {};

let examples = {
    pdfs: 'PDFs',
    screenshots: 'Screenshots',
};

Object.keys(examples).forEach((key) => {
    data[key] = require(`./examples/${key}.js`);
    data[key].source = fs.readFileSync(`./examples/${key}.js`, 'utf8');
    data[key].label = examples[key];
});

var app = express()

app.get('/', (req, res) => {
  res.writeHead(200, {"Content-Type": "text/html"});
  res.write(`<html>
<head>
    <title>Headless Chrome on Platform.sh</title>
    <script type="text/javascript" src="examples/screenshots.js"></script>
</head>
<body>
<h1>Headless Chrome on Platform.sh</h1>

<a href="/relationship">Relationship</a>

<h2>Puppeteer usage examples</h2>

<h3>Take a Screenshot of a page</h3>

<script type="text/javascript" src="~/examples/screenshots.js"></script>
<input type="text" id="urlScreenshot" name="urlScreenshot2"/>
<button onclick="takeScreenshot(urlScreenshot.value)">Submit</button>

<ul>
  <li><a href="/screenshots/source">Source</a></li>
</ul>

<h3>Make a PDF copy of a page</h3>

<form action="/examples/pdfs.js">
url: <input type="text" name="urlPDF" value="Enter a url"><input type="submit" value="Submit">
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


app.get('/screenshots/source', (req, res) => {
  res.write(data['screenshots'].source)
})

app.get('/pdfs/source', (req, res) => {
  res.write(data['pdfs'].source)
})


// Start the server.
app.listen(config.port, function() {
    console.log(`Listening on port ${config.port}`)
});
