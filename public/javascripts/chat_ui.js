(function(root){
  var ChatApp = root.ChatApp = (root.ChatApp || {})

  var getMessage = function() {
    return $(".message").val()
  };

  var sendText = function(currentChat) {
    currentChat.sendMessage(getMessage())
  }

  var addToTop = function () {
    $(".received-messages").prepend(getMessage())
  }

  $(document).ready(function() {
    var socket = io.connect();
    var currentChat = new ChatApp.Chat(socket);

    //listening new messages
    socket.on("message", function(data) {
      io.sockets.emit("pingback", {text: data.text})
    });

    //sending new messages
    $(".submit").click( function(event) {
      event.preventDefault();
      sendText(currentChat);
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