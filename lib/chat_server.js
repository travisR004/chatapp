var io = require('socket.io')

var createChat = function (server, io){
  io.sockets.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('message', function (data) {
      console.log(data);
      socket.emit('pingback', {text: 'message received!: ' + data.text})
    });
  });
}

exports.createChat = createChat


// io.sockets.on('connection', function (socket) {
//   socket.emit('news', { hello: 'world' });
//   socket.on('message', function (data) {
//     console.log(data);
//     socket.emit('pingback', {text: 'message received!: ' + data.text})
//   });
// });