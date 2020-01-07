const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/here', function(req, res) {
	res.send(req.query.hello);
})

app.listen(8888);