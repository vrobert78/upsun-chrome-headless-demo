const fs = require('fs');
const uuidv4 = require('uuid/v4')
const express = require('express');
const rateLimit = require("express-rate-limit");
const platformsh = require('platformsh-config');

// Require local examples
var pdfs = require("./examples/pdfs.js");
var screenshots = require("./examples/screenshots.js");
var searches = require("./examples/search.js");
var viewSource = require("./examples/viewSource.js");
var verifySource = require('./examples/verifySearch.js');

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

<i>I need to generate PDFs of pages.</i></br></br>

Click 'Submit' to generate a PDF of the <a href="https://platform.sh/">Platform.sh website</a>, or paste in another URL.

</br></br>

<form method="get" action="/pdfs/result">
    <input type="text" name="pdfURL" value="https://platform.sh/">
    <input type="submit">
</form>

<h2>Take a screenshot of a page (<a href="/screenshots/source">Source</a>)</h2>

<i>Does my site look like I intended it to?</i></br></br>

Click 'Submit' to create a screenshot of the <a href="https://platform.sh/">Platform.sh website</a>, or paste in another URL.

</br></br>

<form method="get" action="/screenshots/result">
    <input type="text" name="screenshotURL" value="https://platform.sh/">
    <input type="submit">
    </br></br>
    <i>How about on mobile devices?</i>
    </br></br>
    <input type="checkbox" name="emulateMobile" value=true> Emulate mobile device<br>
</form>

<h2>Retrieve search results (<a href="/search/source">Source</a>)</h2>

<i>Is my search engine working like I expect it to?</i></br></br>

In this demo, Puppeteer visits <a href="https://developers.google.com/web/">https://developers.google.com/web/</a>, locates the main search bar and fills it with the user input below. It waits for the search dropdown to appear, then clicks the "All Search Results" option, finally outputting all values returned to the resulting page.

</br></br>

<form method="get" action='/search/result'>
    <input type="text" name="searchField" value="Headless Chrome">
    <input type="submit">
</form>

<h2>Test the appearance of search results (<a href="/verifysearch/source">Source</a>)</h2>

<i>How do search results appear to my users?</i></br></br>

In this demo, Puppeteer visits YouTube and types the value provided below in the search bar. It simulates a click on the Search button, and takes a screenshot of the result.

</br></br>

<form method="get" action="/verifysearch/result">
    <input type="text" name="verifysearchTerm" value="Platform.sh">
    <input type="submit">
</form>

<h2>View page links (<a href="/pagesource/source">Source</a>)</h2>

Return all links on a given page.

</br></br>

<form method="get" action='/pagesource/result'>
    <input type="text" name="sourceURL" value="https://docs.platform.sh/">
    <input type="submit">
</form>

<i>Modified from <a href="https://github.com/GoogleChromeLabs/puppeteer-examples/blob/master/view-source.js">GoogleChromeLabs</a>.</i>

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
    // Generate list of links from search results
    var links = await searches.searchPage(req.query['searchField']);
    res.write(links);
});

// Define Page Source result route
app.get('/pagesource/result', async function(req, res){
    var currentSource = await viewSource.getPageSource(req.query['sourceURL']);
    res.write(currentSource);
});

// Define Verify Search Appearance route
app.get('/verifysearch/result', async function(req, res){
  // Create a randomly generated ID number for the current screenshot
  var screenshotID = uuidv4();
  // Generate the screenshot
  await verifySource.takeScreenshot(screenshotID, req.query['verifysearchTerm'])
  // Define and download the file
  const file = `screenshots/${screenshotID}.png`;
  res.download(file);
});

// PDFs source
app.get('/pdfs/source', (req, res) => {
    res.write(fs.readFileSync('./examples/pdfs.js', 'utf8'));
});

// Screenshots source
app.get('/screenshots/source', (req, res) => {
    res.write(fs.readFileSync('./examples/screenshots.js', 'utf8'));
});

// Search source
app.get('/search/source', (req, res) => {
    res.write(fs.readFileSync('./examples/search.js', 'utf8'));
});

// Page Source source
app.get('/pagesource/source', (req, res) => {
    res.write(fs.readFileSync('./examples/viewSource.js', 'utf8'));
});

// Verify Search Appearance source
app.get('/verifysearch/source', (req, res) => {
    res.write(fs.readFileSync('./examples/verifySearch.js', 'utf8'));
});

// Get PORT and start the server
let config = platformsh.config();
app.listen(config.port, function() {
    console.log(`Listening on port ${config.port}`)
});
