var socket = io.connect('/');

function conductorClick(e) {
    var activeNotes = new Array();
    var inputNotes = document.getElementsByClassName('active');

    for(var i =0; i < inputNotes.length; i++) {
        activeNotes.push(inputNotes[i].id);
    }
    socket.emit('active', activeNotes);
}
