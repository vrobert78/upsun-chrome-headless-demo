const fs = require('fs');
const uuidv4 = require('uuid/v4')
const express = require('express');
const rateLimit = require("express-rate-limit");
const platformsh = require('platformsh-config');

// Require locals
var pdfs = require("./examples/pdfs.js");
var screenshots = require("./examples/screenshots.js");
var searches = require("./examples/search.js");

var searchRoute = '/search/result/' + uuidv4();

// Build the application
var app = express();

// Define static source for css
app.use(express.static(__dirname + '/public'));

// Set rate limits
app.set('trust proxy', 1);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50 // limit each IP to 50 requests per windowMs
});

// Apply to all requests
app.use(limiter);

// Define the index route
app.get('/', (req, res) => {
  res.writeHead(200, {"Content-Type": "text/html"});
  res.write(`<html>
<head>
    <title>Headless Chrome on Platform.sh</title>
    <link rel="stylesheet" type="text/css" href="css/style.css" />
</head>
<body>

<h1>Headless Chrome on Platform.sh</h1>

<h2>Generate a PDF of a page (<a href="/pdfs/source">Source</a>)</h2>

Click 'Submit' to generate a PDF of the <a href="https://platform.sh/">Platform.sh website</a>, or paste in another URL.

</br></br>

<form method="get" action="/pdfs/result">
    <input type="text" name="pdfURL" value="https://platform.sh/">
    <input type="submit">
</form>

<h2>Take a screenshot of a page (<a href="/screenshots/source">Source</a>)</h2>

Click 'Submit' to create a screenshot of the <a href="https://platform.sh/">Platform.sh website</a>, or paste in another URL.

</br></br>

<form method="get" action="/screenshots/result">
    <input type="text" name="screenshotURL" value="https://platform.sh/">
    <input type="submit">
    </br>
    <input type="checkbox" name="emulateMobile" value=true> Emulate mobile device<br>
</form>

<h2>Retrieve search results (<a href="/search/source">Source</a>)</h2>

Search <a href="https://developers.google.com/web/">https://developers.google.com/web/</a>.

</br></br>

<form method="get" action='/search/result'>
    <input type="text" name="searchField" value="Headless Chrome">
    <input type="submit">
</form>
`);
    res.end(`</body></html>`);
})

// Define PDF result route
app.get('/pdfs/result', async function(req, res){
  // Create a randomly generated ID number for the current PDF
  var pdfID = uuidv4();
  // Generate the PDF
  await pdfs.makePDF(req.query['pdfURL'], pdfID)
  // Define and download the file
  const file = `pdfs/${pdfID}.pdf`;
  res.download(file);
});

// Define Screenshots result route
app.get('/screenshots/result', async function(req, res){
  // Create a randomly generated ID number for the current screenshot
  var screenshotID = uuidv4();
  // Generate the screenshot
  await screenshots.takeScreenshot(req.query['screenshotURL'], screenshotID, req.query['emulateMobile'])
  // Define and download the file
  const file = `screenshots/${screenshotID}.png`;
  res.download(file);
});

// Define Search result route
app.get('/search/result', async function(req, res){
//    var searchID = uuidv4();
    var links = await searches.searchPage(req.query['searchField'])
    res.write(links);
});

// PDFs source
app.get('/pdfs/source', (req, res) => {
    res.write(fs.readFileSync('./examples/pdfs.js', 'utf8'));
})

// Screenshots source
app.get('/screenshots/source', (req, res) => {
    res.write(fs.readFileSync('./examples/screenshots.js', 'utf8'));
})

// Search source
app.get('/search/source', (req, res) => {
    res.write(fs.readFileSync('./examples/search.js', 'utf8'));
})

// Get PORT and start the server
let config = platformsh.config();
app.listen(config.port, function() {
    console.log(`Listening on port ${config.port}`)
});
