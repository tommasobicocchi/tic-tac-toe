var express = require('express');
var app = express();
var socket = require('socket.io');


var server = app.listen(8000);

app.use(express.static('.'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

var io = require('socket.io').listen(server);

io.on('connection', function(socket){
    console.log('made socket connection')

    socket.on('table', function(data){
      socket.broadcast.emit('table',data);
      //io.sockets.emit('table',data);
      //io.sockets.sockets[senserID].broadcast.emit('table', data);
    })

    socket.on('move', function(data){
      socket.broadcast.emit('move', data);
    })
})
