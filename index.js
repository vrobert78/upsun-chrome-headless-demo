const fs = require('fs');
const uuidv4 = require('uuid/v4')
const platformsh = require('platformsh-config');
const express = require('express');

// Require pdf file and its function
var pdfs = require("./pdfs.js");

// Build the application
var app = express();

// Define the index route
app.get('/', (req, res) => {
  res.writeHead(200, {"Content-Type": "text/html"});
  res.write(`<html>
<head>
    <title>Headless Chrome on Platform.sh</title>
</head>
<body>

<h1>Headless Chrome on Platform.sh</h1>

<h2>Generate a PDF of a page</h2>

Click submit to generate a PDF of the <a href="https://platform.sh/">Platform.sh website</a>, or paste in another URL.

</br></br>

<form method="get" action="/result">
    <input type="text" name="pdfURL" value="https://platform.sh/">
    <input type="submit">
</form>

`);
    res.end(`</body></html>`);
})

// Define PDF result route
app.get('/result', async function(req, res){
  // Create a randomly generated ID number for the current PDF
  var pdfID = uuidv4();
  // Generate the PDF
  await pdfs.makePDF(req.query['pdfURL'], pdfID)
  // Define and download the file
  const file = `pdfs/${pdfID}.pdf`;
  res.download(file);
});

// Create config object to get Platform.sh PORT credentials
let config = platformsh.config();

// Start the server.
app.listen(config.port, function() {
    console.log(`Listening on port ${config.port}`)
});