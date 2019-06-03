const parseUrl = require('parse_url');
const platformsh = require('platformsh-config');
const fs = require('fs');
const uuidv4 = require('uuid/v4')

var express = require('express');

var screenshot = require("./examples/screenshots.js");
var pdf = require("./examples/pdfs.js");

// Get the credentials for headless Chrom
let config = platformsh.config();
const credentials = config.credentials('headless');

// Create a randomly generated ID number for the current demo
var screenshotID = uuidv4();
var pdfID = uuidv4();

// Define each example
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

// Build the application
var app = express()

//app.use("/examples", express.static('./examples/'));

app.get('/', (req, res) => {
  res.writeHead(200, {"Content-Type": "text/html"});
  res.write(`<html>
<head>
    <title>Headless Chrome on Platform.sh</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
</head>
<body>

<h1>Headless Chrome on Platform.sh</h1>

<h2>Details</h2>

<ul>
    <li><a href="/relationship">What the relationship looks like on Platform.sh</a></li>
    <li><a href="https://developers.google.com/web/updates/2017/04/headless-chrome">Getting Started with Headless Chrome</a></li>
    <li><a href="https://docs.google.com/document/d/1R_EalfZMwznf9o7bASNUqotdM2RF3FpeqPPWLxI1ofI/edit">Going Headless on Platform.sh</a></li>
    <li><a href="https://github.com/platformsh/platformsh-docs/pull/1101">(PR#1101) Adding headless Chrome to Platform.sh documentation</a></li>
</ul>

<h2>Usage examples</h2>



<h3>Take a Screenshot of a page (<a href="/examples/screenshot">Source</a>)</h3>

<form method="get" action="/screenshots/result">
    <input type="text" name="screenshotURL" value="https://platform.sh/">
    <input type="submit">
</form>


<h3>Make a PDF copy of a page (<a href="/examples/pdf">Source</a>)</h3>

<form action="/examples/pdfs.js">
<input type="text" name="urlPDF" value="Enter a url"><input type="submit" value="Submit">
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
app.get('/examples/screenshot', (req, res) => {
  res.write(data['screenshots'].source)
})

// PDF source
app.get('/examples/pdf', (req, res) => {
  res.write(data['pdfs'].source)
})

// Screenshot result
app.get('/screenshots/result', async function(req, res){
  await screenshot.takeScreenshot(req.query['screenshotURL'], screenshotID)
  const file = `screenshots/${screenshotID}.png`;
  res.download(file); // Set disposition and send it.
});

// PDF result
app.get('/pdfs/result', function(req, res){
  const file = `pdfs/${pdfID}.png`;
  res.download(file); // Set disposition and send it.
});

// Start the server.
app.listen(config.port, function() {
    console.log(`Listening on port ${config.port}`)
});
