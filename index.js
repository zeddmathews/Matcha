// import { createServer } from 'http';
// import { parse } from 'url';
// import { readFile } from 'fs';

const http = require('http');
const path = require('path');
// const url = require('url');
const fs = require('fs');

const server = http.createServer((req, res) => {		//req = request, res = response
	console.log(req.url);
	if (req.url === '/') {
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write('<h1>Home</h1>');
		res.end();
	}
	// res.write('Is online');
	// res.end();
})

const PORT = process.env.PORT || 8888;

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

// http.createServer((req, res) => {
// 	console.log('oi');
// 	var q = url.parse(req.url, true);
// 	var fileName = "." + q.pathname;
// 	fs.readFile(fileName, (err, data) => {
// 		if (err) {
// 			res.writeHead(404, {'Content-Type': 'text/html'});
// 			console.log('Fail');
// 			return res.end("404 Not Found");
// 		}
// 		res.writeHead(200, {'Content-Type' : 'text/html'});
// 		res.write(data);
// 		console.log('Success');
// 		return res.end();
// 	});
// }).listen(5000, () => console.log('Yes?'));

// createServer(function (req, res) {
//   var q = parse(req.url, true);
//   var filename = "." + q.pathname;
//   readFile(filename, function(err, data) {
//     if (err) {
//       res.writeHead(404, {'Content-Type': 'text/html'});
//       return res.end("404 Not Found");
//     }
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.write(data);
//     return res.end();
//   });
// }).listen(5000);


// const req_http = require('http');
// req_http.createServer((req, res) => {
// 	res.write('Online');
// 	res.end();
// }).listen(5000, () => console.log('Server running'))