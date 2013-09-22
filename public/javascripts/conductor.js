
Zepto(function($) {

var socket = io.connect('/');
var notes = [];

function conductorClick(e) {
  var activeNotes = new Array();
  var inputNotes = document.getElementsByClassName('active');

  for(var i =0; i < inputNotes.length; i++) {
    activeNotes.push(inputNotes[i].id);
  }
  socket.emit('active', notes);
}

  $('.key').on('click', function() {
    this.setAttribute('style', 'fill:blue; stroke:black;')
    var id = this.id;
    notes.push(id)
  });

});
