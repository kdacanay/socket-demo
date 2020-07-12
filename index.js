const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', function (req, res) {
  res.render('index.ejs');
});

// socket.io deals with two files at the same time: server.app(index.js) and front end file(index.ejs)
// creates a tunnel between server and client w/continuous real-time connection
// io.sockets.on('connection', function(socket) {
//   write all the realtime communication functions here
// });

io.sockets.on('connection', function (socket) {

  socket.on('username', function (username) {
    socket.username = username;
    io.emit('is_online', '🔵 <i>' + socket.username + ' join the chat...</i>');
  });

  socket.on('disconnect', function (username) {
    io.emit('is_online', '🔴 <i>' + socket.username + ' left the chat...</i>');
  });

  socket.on('chat_message', function (message) {
    io.emit('chat_message', '<strong>' + socket.username + '</strong>: ' + message);
  });
});

const server = http.listen(8080, function () {
  console.log('listening on *:8080');
});