var socket = io.connect('/');
var uid;
var room = '1234';
var tone;

var notes = {
  "a"       : 220,
  "a-sharp" : 233.08,
  "b"       : 246.94,
  "c"       : 261.63,
  "c-sharp" : 277.18,
  "d"       : 293.66,
  "d-sharp" : 311.13,
  "e-sharp" : 329.66,
  "f"       : 349.23,
  "f-sharp" : 369.99,
  "g"       : 392,
  "g-sharp" : 415.3
};


socket.emit('join', room);
socket.on('joined', function(sessionID) {
  console.log("Someone joined room: " + sessionID);
});

socket.on('note', function(p) {
  if (p.uid == uid) {
    var hz = notes[p.note];
    console.log(hz);
    tone = T("saw", {'freq':hz, 'mul':0.5}).play();
    $('#singing').text("LOUD AND PROUD: " + p.note.toUpperCase());
  }
});

socket.on('id', function(id){
  console.log('id:', id)
  uid = id;
});


function changeChord() {
  socket.emit('toggle');
  console.log("clicked button");
}

function doublePitch() {
  tone.freq.value *= 2;
}

function halfPitch() {
  tone.freq.value /= 2;
}
