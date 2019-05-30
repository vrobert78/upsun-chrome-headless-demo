const parseUrl = require('parse_url');
const platformsh = require('platformsh-config');

let config = platformsh.config();

var express = require('express')

var app = express()

app.get('/', (req, res) => {
  res.send('Hello World! <a href="/test">Test page</a>')
})

app.get('/test', (req, res) => {
  res.send('Another page!')
})

// Start the server.
app.listen(config.port, function() {
    console.log(`Listening on port ${config.port}`)
});
