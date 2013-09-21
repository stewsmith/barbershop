
/**
 * Module dependencies.
 */

var express = require('express');
var app = express();
var http = require('http');
var path = require('path');
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var routes = require('./routes');
var user = require('./routes/user');


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var hertz = [196, 247, 293.6];
var uid = 1;

io.sockets.on('connection', function(socket) {
  socket.emit('test');
  socket.on('join', function(sessionID) {
    socket.emit('id', uid++);
    socket.set('sessionID', sessionID, function() {
      if(socket.join(sessionID)) {
        socket.broadcast.to(sessionID).emit('joined', sessionID);
        socket.emit('tone', hertz[io.sockets.clients(sessionID).length % 3]);
      }
    });
  });
});

io.sockets.on('toggle', function(data){
  io.sockets.get('sessionID', function(err, sessionID){
    if (err) {
      console.log(err);
    } else if (sessionID) {
      console.log(data);
      socket.broadcast.to(sessionID).emit('action', data);
    } else {
      console.log("No sessionID");
    }
  });
});

  // Number of people in room
  //(io.sockets.clients(sessionID).length)
