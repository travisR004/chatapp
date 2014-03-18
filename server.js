
var static = require('./node_modules/node-static/lib/node-static.js');

var fs = require('fs')
var file = new static.Server('./public');

var server = require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        //
        // Serve files!
        //
        file.serve(request, response);
    }).resume();
})

var io = require('socket.io').listen(server)
server.listen(8080);

var chatServer = require("./lib/chat_server.js")

chatServer.createChat(server, io)

//Socket.io is required in chat_server.js
//HTTP is required in server.js

//This will be in your server.js file
// app.listen(8080);

// function handler (req, res) {
//   fs.readFile(__dirname + '/index.html',
//   function (err, data) {
//     if (err) {
//       res.writeHead(500);
//       return res.end('Error loading index.html');
//     }
//     //
//     // file.serve(req, res);
//     res.writeHead(200);
//     res.end(data);
//   });
// }

// This will be in your chat_server.js file

// io.sockets.on('connection', function (socket) {
//   socket.emit('news', { hello: 'world' });
//   socket.on('message', function (data) {
//     console.log(data);
//     socket.emit('pingback', {text: 'message received!: ' + data.text})
//   });
// });
