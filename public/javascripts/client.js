var socket = io.connect('/');

socket.on('test', function() {
  console.log('test complete');
});
var room = '1234';
socket.emit('join', room);
socket.on('joined', function(sessionID) {
  console.log("Someone joined room: " + sessionID);
});



socket.on('tone', function(hz) {
  console.log(hz);
  tone = T("sin", hz*2).play();
});
