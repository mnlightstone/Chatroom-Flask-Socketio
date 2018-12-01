window.onload = function() {
    addChannel();
    newDirectMessage();

var socket = io.connect('http://' + document.domain + ':' + location.port);
    socket.on('connect', function() {
        socket.emit('my event', {data: 'I\'m connected!'});
    });




} //end window.onload

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
    //if the esc key was pressed AND either of the popups are currently active
    if (evt.keyCode == 27 &&
    (directMessagePopup.style.display == "block" ||
     channelPopup.style.display == "block" )) {
     //set both popups to no display
        directMessagePopup.style.display = "none";
        channelPopup.style.display = "none";
    }
};
