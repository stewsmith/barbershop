var socket = io.connect('/');
var uid;
var room = '1234';
var tone;

var notes = {
  "A"  : 220,
  "A#" : 233.08,
  "B"  : 246.94,
  "C"  : 261.63,
  "C#" : 277.18,
  "D"  : 293.66,
  "D#" : 311.13,
  "E"  : 329.66,
  "F"  : 349.23,
  "F#" : 369.99,
  "G"  : 392
};

socket.on('test', function(notes) {
  console.log(notes);
});

socket.emit('join', room);
socket.on('joined', function(sessionID) {
  console.log("Someone joined room: " + sessionID);
});

socket.on('tone', function(p) {
  if (p.uid == uid) {
    var hz = notes[p.note];
    tone = T("saw", {freq:hz, mul:0.5}).play();
    $('#singing').append(note);
  }
});

socket.on('id', function(id){
  console.log('id:', id)
  uid = id;
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
