var socket = io.connect('/');
var uid;
var room = '1234';

var notes = {
  "A"  : 220,
  "A#" : 233.08,
  "B"  : 246.94,
  "C"  : 261.63,
  "C#" : 277.18,
  "D"  : 293.66,
  "D#" :311.13,
  "E"  :329.66,
  "F"  :349.23,
  "G"  :369.99
};

function setId(id){
  uid = id;
}

socket.on('test', function() {
  console.log('test complete');
});

socket.emit('join', room);
socket.on('joined', function(sessionID) {
  console.log("Someone joined room: " + sessionID);
});

socket.on('tone', function(note) {
  console.log('got initial tone: ' + hz);
  hz = notes[note] * 2;
  tone = T("sin", hz).play();
});

socket.on('id', function(id){
  console.log('id:', id)
});

socket.on('change', function() {
  console.log('got new tone doubling frequencies')
  tone.freq.value *= 2;
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
