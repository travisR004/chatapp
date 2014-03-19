(function(root) {
  var ChatApp = root.ChatApp = (root.ChatApp || {})

  var Chat = ChatApp.Chat = function(socket){
    this.socket = socket;
  };

  Chat.prototype.sendMessage = function (message) {
    this.socket.emit("message", {text: message})
  };

  Chat.prototype.processCommand = function(inputData){
    var data = inputData.split(" ")
    if(data[0] === "nick"){
      this.socket.emit("nicknameChangeRequest", {text: data[1]})
    } else if(data[0] === "join"){
      this.socket.emit("handleRoomChangeRequests", {room: data[1]})
    }
  };

})(this);