var notes = [];
var socket = io.connect('/');
var room = "1234";

function conductorClick() {
  if (notes.length > 0)
    socket.emit('active', notes);
}

socket.emit('join', room);
socket.on('joined', function(sessionID) {
  console.log("Conductor joined room: " + sessionID);
});

Zepto(function($) {


  $('rect').on('click', function() {
    console.log(this.className.baseVal);
    if(this.className.baseVal == 'wkey') {
      console.log('white');
      this.setAttribute('class', 'active-white-key');
      this.setAttribute('style', 'fill:blue; stroke:black;')
      var id = this.id;
      notes.push(id);
    }
    else if(this.className.baseVal == 'bkey') {
      this.setAttribute('class', 'active-black-key');
      this.setAttribute('style', 'fill:red; stroke:black;')
      var id = this.id;
      notes.push(id);
    }
    else if (this.className.baseVal == 'active-white-key') {
      this.setAttribute('class', 'wkey');
      this.setAttribute('style', 'fill:white; stroke:black;')
      var id = this.id;
      notes.splice(notes.indexOf(id), 1);
    }
    else if (this.className.baseVal == 'active-black-key') {
      this.setAttribute('class', 'bkey');
      this.setAttribute('style', 'fill:black; stroke:black;')
      var id = this.id;
      notes.splice(notes.indexOf(id), 1);
    }
  });

});
