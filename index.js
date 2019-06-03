const path = require('path');
const parseUrl = require('parse_url');
const platformsh = require('platformsh-config');
const fs = require('fs');
const uuidv4 = require('uuid/v4')
const rateLimit = require("express-rate-limit");

var express = require('express');

var screenshot = require("./examples/screenshots.js");
var emulate = require("./examples/emulate.js");
var pdf = require("./examples/pdfs.js");

// Get the credentials for headless Chrome
let config = platformsh.config();
const credentials = config.credentials('headless');

// Create a randomly generated ID number for the current demo
var screenshotID = uuidv4();
var emulateID = uuidv4();
var pdfID = uuidv4();

// Define each example
var data = {};

let examples = {
    pdfs: 'PDFs',
    screenshots: 'Screenshots',
    emulate: 'Emulate',
};

Object.keys(examples).forEach((key) => {
    data[key] = require(`./examples/${key}.js`);
    data[key].source = fs.readFileSync(`./examples/${key}.js`, 'utf8');
    data[key].label = examples[key];
});

// Build the application
var app = express()
app.use(express.static(path.join(__dirname,"styles")));
app.use(express.static)

// Set rate limits
app.set('trust proxy', 1);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50 // limit each IP to 50 requests per windowMs
});

//  apply to all requests
app.use(limiter);

app.get('/', (req, res) => {
  res.writeHead(200, {"Content-Type": "text/html"});
  res.write(`<html>
<head>
    <title>Headless Chrome on Platform.sh</title>
    <link rel="stylesheet" type="text/css" href="styles/styles.css">
</head>
<body>

<h1>Headless Chrome on Platform.sh</h1>

<h2>Details</h2>

<ul>
    <li><a href="/relationship">What the relationship looks like on Platform.sh</a></li>
    <li><a href="https://github.com/GoogleChrome/puppeteer">Puppeteer</a></li>
    <li><a href="https://developers.google.com/web/updates/2017/04/headless-chrome">Getting Started with Headless Chrome</a></li>
    <li><a href="https://docs.google.com/document/d/1R_EalfZMwznf9o7bASNUqotdM2RF3FpeqPPWLxI1ofI/edit">Going Headless on Platform.sh</a></li>
    <li><a href="https://github.com/platformsh/platformsh-docs/pull/1101">(PR#1101) Adding headless Chrome to Platform.sh documentation</a></li>
</ul>

<h2>Usage examples</h2>

Click submit to generate a png or pdf of the <a href="https://platform.sh/">Platform.sh website</a>, or paste in another URL.

<h3>Take a Screenshot of a page (<a href="/screenshots/source">Source</a>)</h3>

<form method="get" action="/screenshots/result">
    <input type="text" name="screenshotURL" value="https://platform.sh/">
    <input type="submit">
</form>

<h3>Take a Screenshot of a page, emulating mobile device (<a href="/emulate/source">Source</a>)</h3>

<form method="get" action="/emulate/result">
    <input type="text" name="emulateURL" value="https://platform.sh/">
    <input type="submit">
</form>

<h3>Make a PDF copy of a page (<a href="/pdfs/source">Source</a>)</h3>

<form method="get" action="/pdfs/result">
    <input type="text" name="pdfURL" value="https://platform.sh/">
    <input type="submit">
</form>

`);
    res.end(`</body></html>`);
})

// Relationship JSON
app.get('/relationship', (req, res) => {
  res.writeHead(200, {"Content-Type": "text/html"});
  res.end("<html><head><title>Relationship</title></head><body><pre>"+JSON.stringify(credentials, null, 4) + "</pre></body></html>");
})


// Screenshot source
app.get('/screenshots/source', (req, res) => {
  res.write(data['screenshots'].source)
})

// Emulate source
app.get('/emulate/source', (req, res) => {
  res.write(data['emulate'].source)
})

// PDF source
app.get('/pdfs/source', (req, res) => {
  res.write(data['pdfs'].source)
})

// Screenshot result
app.get('/screenshots/result', async function(req, res){
  await screenshot.takeScreenshot(req.query['screenshotURL'], screenshotID)
  const file = `screenshots/${screenshotID}.png`;
  res.download(file); // Set disposition and send it.
});

// Emulate result
app.get('/emulate/result', async function(req, res){
  await emulate.emulateScreenshot(req.query['emulateURL'], emulateID)
  const file = `screenshots/${emulateID}.png`;
  res.download(file); // Set disposition and send it.
});

// PDF result
app.get('/pdfs/result', async function(req, res){
  await pdf.makePDF(req.query['pdfURL'], pdfID)
  const file = `pdfs/${pdfID}.pdf`;
  res.download(file); // Set disposition and send it.
});

// Start the server.
app.listen(config.port, function() {
    console.log(`Listening on port ${config.port}`)
});
