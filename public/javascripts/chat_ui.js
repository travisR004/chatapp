(function(root){
  var ChatApp = root.ChatApp = (root.ChatApp || {})

  var getMessage = function() {
    return $(".message").val()
  };

  var processInput = function(currentChat) {
    if(getMessage()[0] === "/"){
      currentChat.processCommand(getMessage().slice(1))
    } else {
      currentChat.sendMessage(getMessage())
    }
  }

  var addToTop = function () {
    // $(".received-messages").prepend(getMessage())
  }

  var updateRoom = function(currentChat, room){
    currentChat.room = room;
  }

  var showRoomList = function(currentChat, currentRooms, nicknames){
    debugger
    var room = currentChat.room;
    var usersInRoom = [];
    var namesInRoom = [];
    for (key in currentRooms) {
      if (currentRooms.hasOwnProperty(key)) {
        if (currentRooms[key] === room) {
          usersInRoom.push(key)
        }
      }
    }
    usersInRoom.forEach(function(socketIds){
      namesInRoom.push(nicknames[socketIds]);
    })
    debugger
    $(".users-in-room").empty()
    namesInRoom.forEach(function(user){
      $(".users-in-room").append(user)
    })
  }

  $(document).ready(function() {
    var socket = io.connect();
    var currentChat = new ChatApp.Chat(socket);

    socket.on("room", function(data){
      updateRoom(currentChat, data.room)
    })

    socket.on("roomList", function(data){
      showRoomList(currentChat, data.currentRooms, data.nicknames)
    })

    $(".submit").click( function(event) {
      event.preventDefault();
      processInput(currentChat);
      addToTop();
    })
  })

})(this);
//
// var createChat = function (server, io){
//   io.sockets.on('connection', function (socket) {
//     socket.emit('news', { hello: 'world' });
//     socket.on('message', function (data) {
//       console.log(data);
//       socket.emit('pingback', {text: 'message received!: ' + data.text})
//     });
//   });
// }