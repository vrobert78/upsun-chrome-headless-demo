const fs = require('fs');
const uuidv4 = require('uuid/v4')
const platformsh = require('platformsh-config');
const express = require('express');

// Require locals
var pdfs = require("./examples/pdfs.js");
var screenshots = require("./examples/screenshots.js");

// Build the application
var app = express();

// Define static source for css
app.use(express.static(__dirname + '/public'));

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

<h2>Take a screenshot of a page</h2>

Click 'Submit' to create a screenshot of the <a href="https://platform.sh/">Platform.sh website</a>, or paste in another URL.

</br></br>

<form method="get" action="/screenshots/result">
    <input type="text" name="screenshotURL" value="https://platform.sh/">
    <input type="submit">
</form>

<h2>Generate a PDF of a page</h2>

Click 'Submit' to generate a PDF of the <a href="https://platform.sh/">Platform.sh website</a>, or paste in another URL.

</br></br>

<form method="get" action="/pdfs/result">
    <input type="text" name="pdfURL" value="https://platform.sh/">
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
  await screenshots.takeScreenshot(req.query['screenshotURL'], screenshotID)
  // Define and download the file
  const file = `screenshots/${screenshotID}.pdf`;
  res.download(file);
});

// Get PORT and start the server
let config = platformsh.config();
app.listen(config.port, function() {
    console.log(`Listening on port ${config.port}`)
});
