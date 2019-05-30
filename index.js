var express = require('express')
var app = express()

app.get('/', (req, res) => {
  res.send('Hello World! <a href="/test">Test page</a>')
})

app.get('/test', (req, res) => {
  res.send('Another page!')
})

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})
