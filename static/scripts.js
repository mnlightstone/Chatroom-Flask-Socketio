window.onload = function() {

                         //https for deployment to Heroku http for localHost
  var socket = io.connect('https://' + document.domain + ':' + location.port, {transports: ['websocket']});
  var firstConnect = true;
  var myName = "";

  addSubmitButtonListener(socket);

  socket.on('connect', function() {
    socket.emit('connection event');
  });

  socket.on('incoming message', function(msg, author, avatar){
    if (author == myName){
      addMessageFromSelf(avatar, author, msg);
    } else {
      addMessageFromOtherUser(avatar, author, msg);
    }
      var height =  $( '#messages-div' ).height() + 10;
      $( '#messages-div' ).scrollTop(height);
  })

  socket.on('someone connected', function(displayName, avatar, usersOnlineDisplayNames, usersOnlineAvatars) {
    console.log(firstConnect)
    if (firstConnect){
      myName = displayName;
      for (var i = 0; i < usersOnlineAvatars.length; i++){
      console.log(usersOnlineDisplayNames[i])
        addUserToOnlineDiv(usersOnlineDisplayNames[i], usersOnlineAvatars[i])
      }
      firstConnect = false;
    } // end if
    else {
        addUserToOnlineDiv(displayName, avatar)
        addUserChangeMessage(displayName, true)
    } // end else
  }); // end someone connected

  socket.on( 'disconnect event',  function(userWhoLeft) {
    console.log("disconnection detected")
    let divToRemove = "." + userWhoLeft + "-user-online-div";
    $(divToRemove).remove();
    addUserChangeMessage(userWhoLeft, false)
  });

} //end onload

function addSubmitButtonListener(socket){
  $('#myMessage').on('keyup', function (e) {
    var message = $('#myMessage').val()
    if(e.which === 13 && message != ""){
      socket.emit('message', message);
      $('#myMessage').val('')
    }
  });

  $('#sendButton').on('click', function(){
    var message = $('#myMessage').val()
    if (message != ""){
      socket.emit('message', message);
      $('#myMessage').val('')
    }
  })
}

function addUserChangeMessage(displayName, connectionEvent){
    var joinedOrLeft;
    (connectionEvent) ? joinedOrLeft = "joined" : joinedOrLeft = "left";
    $("#messages-div").append('<div class = "user-joined-message">' +
    displayName + " has " + joinedOrLeft + " the room. </div>")
}

function addMessageFromSelf(avatar, author, msg){
  $("#messages-div").append('<div class = "my-messages">' +
    msg +
  "<img class = 'messages-avatar' src = static/images/jeff" + avatar + ".jpg>" +
  '</div>'
)};

function addMessageFromOtherUser(avatar, author, msg){
  $("#messages-div").append('<div class = "other-messages">' +
  "<img class = 'messages-avatar' src = static/images/jeff" + avatar + ".jpg>" +
  author +
  ": " +
  msg +
  '</div>'
)};

function addUserToOnlineDiv(displayName, avatar){
  $("#online-users-div").append(
    '<div class = "' + displayName + '-user-online-div">' +
    '<img class = "avatar-sidebar-img" src=static/images/jeff' + avatar + ".jpg>" +
    displayName +
    '</div>')
  }