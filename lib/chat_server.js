var io = require('socket.io')
var guestNumber = 0;
var nicknames = {};
var currentRooms = {}

var createChat = function (server, io){
  io.sockets.on('connection', function (socket) {
    guestNumber ++;
    nicknames[socket.id] = "guest" + guestNumber;
    currentRooms[socket.id] = "lobby";
    socket.join("lobby");
    socket.emit("room", {room: currentRooms[socket.id]})
    io.sockets.emit("roomList", {nicknames: nicknames, currentRooms: currentRooms})

    socket.on("disconnect", function(){
      socket.leave(currentRooms[socket.id])
      currentRooms[socket.id] = "";
    })

    socket.on('message', function (data) {
      io.sockets.in(currentRooms[socket.id]).emit('pingback', {text: nicknames[socket.id] + ": " + data.text})
    });

    socket.on("handleRoomChangeRequests", function(data) {
      socket.join(data.room);
      socket.leave(currentRooms[socket.id]);
      currentRooms[socket.id] = data.room;
      socket.emit("room", {room: currentRooms[socket.id]})
      io.socket.emit("roomList", {nicknames: nicknames, currentRooms: currentRooms})
    });

    socket.on("nicknameChangeRequest", function(data){
      var taken = false;
      for (key in nicknames) {
        if (nicknames.hasOwnProperty(key)) {
          if (nicknames[key] === data.text) {
            taken = true;
          }
        }
      }
      if(taken){
        console.log("taken")
        socket.emit("nicknameChangeResult", {
          success: false,
          message: "Name was already taken"
        })
      } else {
        console.log("not taken")
        nicknames[socket.id] = data.text
      }
    })
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