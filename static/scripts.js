window.onload = function() {
  var socket = io.connect('http://' + document.domain + ':' + location.port);
  var firstConnect = true;

  addSubmitButtonListener(socket);


  socket.on('connect', function() {
    socket.emit('connection event');
    console.log("emiting connection event")
  });

  socket.on('incoming message', function(msg, author){
    console.log("incoming message")
    console.log(author)
    $("#messages-ul").append('<li>' + author + ": "+ msg + '</li>')
  })



  socket.on('disconnection event', function(userWhoLeft) {
    //socket.emit('disconnection event');
    console.log(userWhoLeft + " has left");
  });


  socket.on('someone connected', function(displayName, avatar) {
    console.log("someone arrived")
    $("#online-users-ul").append('<li>' + displayName + '</li>')
    console.log(displayName)
    console.log(avatar)
  });
} //end onload


function addSubmitButtonListener(socket){
  $('#sendButton').on('click', function(){
    var message = $('#myMessage').val()
    if (message != ""){
    socket.emit('message', message);
    $('#myMessage').val('')
    }
  })
}

