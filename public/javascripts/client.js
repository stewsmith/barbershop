var socket = io.connect('/');
var uid;
var room = '1234';

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

socket.on('tone', function(hz) {
  console.log('got initial tone: ' + hz);
  tone = T("sin", hz*2).play();
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
