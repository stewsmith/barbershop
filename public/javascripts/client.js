var socket = io.connect('/');
var uid;

function setId(id){
  uid = id;
}

socket.on('test', function() {
  console.log('test complete');
});

var room = '1234';
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

socket.on('change', function(hz) {
  console.log('got new tone', hz)
  tone.pause();
  tone = T("sin", hz*2).play();
});
