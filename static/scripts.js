window.onload = function() {
    addChannel();
    newDirectMessage();

var socket = io.connect('http://' + document.domain + ':' + location.port);
var firstConnect = true;

    //connection event
    socket.on('connect', function() {
        socket.emit('connection event');
    });

    //someone joined
    socket.on('someone connected', function(users, avatars){
        console.log("someone connected")
        console.log(users)
        console.log(avatars)
        if (users == null){
        return
        }
            if (firstConnect) {
                console.log("first connect running")
                firstConnect = false;
                let count = 0;
                    console.log(users)
                    for (var key in users) {
                        let divToAdd = '<div class = "one-user-online-div">' + users[key] + "</div>"
                         $( '#sidebar-users-online' ).append(divToAdd)
                         count ++;
                        }
                    // if we are already online and this event is from another user joining, add just the new user
                    }
             else {
                    let newestUser = users.length - 1;
                    $( '#usersonline' ).append('<a href = "one-user-online-div">' + users[newestUser] + "</div>")
                }
        });


} //end window.onload



 var form = $( 'add-channel-form' ).on( 'submit', function( e ) {


        // get username and message
        let roomName = $( 'input.message' ).val()

        // send JSON in the form of a Python dictionary
        socket.emit( 'joinroom', {
            message : roomName
            } ) //end socket.emit

        // empty input message field
        $( 'input.message' ).val( '' ).focus()

        }) // end form handler

function newDirectMessage(){
 // Get the modal
    var channelPopup = document.getElementById('Direct-Channel-popup');

    // Get the button that opens the modal
    var btn = document.getElementById("add-direct-message-link");

    // Get the <span> element that closes the modal
    var span = document.getElementById("close-direct-message");

    addPopUpListeners(channelPopup, btn, span);
}

function addChannel(){
    // Get the modal
    var channelPopup = document.getElementById('add-Channel-popup');

    // Get the button that opens the modal
    var btn = document.getElementById("add-channel-link");

    // Get the <span> element that closes the modal
    var span = document.getElementById("close-add-channel");

    addPopUpListeners(channelPopup, btn, span);
}

function addPopUpListeners(popup, btn, span){
    // When the user clicks on the button, open the modal
    btn.onclick = function() {
        popup.style.display = "block";
    }
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
       popup.style.display = "none";
       console.log(popup.style.display)
    } //end span.onclick

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == popup) {
            popup.style.display = "none";
        }
    }


}

document.onkeyup = function(evt) {
    evt = evt || window.event;
    channelPopup = document.getElementById('add-Channel-popup');
    directMessagePopup = document.getElementById('Direct-Channel-popup');
    //if the esc key was pressed and either of the popups are currently active
    if (evt.keyCode == 27 &&
    (directMessagePopup.style.display == "block" ||
     channelPopup.style.display == "block" )) {
     //set both popups to no display
        directMessagePopup.style.display = "none";
        channelPopup.style.display = "none";
    }
};
