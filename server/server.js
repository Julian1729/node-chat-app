const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

// create express app
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

// register an event listener
io.on('connection', (socket) => {
  console.log('New User connected');

  socket.on('disconnect', () => {
    console.log('client disconnected');
  });

});

server.listen(port, () => {
  console.log('Server up on port ' + port);
});
