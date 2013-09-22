var socket = io.connect('/');
var uid;
var room = '1234';
var tone;

var notes = {
  "A"  : 220,
  "A-sharp" : 233.08,
  "B-sharp"  : 246.94,
  "C-sharp"  : 261.63,
  "C-sharp" : 277.18,
  "D-sharp"  : 293.66,
  "D-sharp" : 311.13,
  "E-sharp"  : 329.66,
  "F-sharp"  : 349.23,
  "F-sharp" : 369.99,
  "G-sharp"  : 392
};


socket.emit('join', room);
socket.on('joined', function(sessionID) {
  console.log("Someone joined room: " + sessionID);
});

socket.on('note', function(p) {
  if (p.uid == uid) {
    var hz = notes[p.note.toUpperCase()];
    console.log(hz);
    tone = T("saw", {freq:hz, mul:0.5}).play();
    $('#singing').append(p.note.toUpperCase());
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
