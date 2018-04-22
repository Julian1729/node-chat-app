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

  // emit (create) an event
  // socket.emit('newMessage', {
  //   from: "julian hernandez",
  //   text: "this is text",
  //   createdAt: 123
  // });

  socket.on('createMessage', (createdMessage) => {
    console.log('Message Created: ', createdMessage);
    // emit to every connection
    io.emit('newMessage', {
      from: createdMessage.from,
      text: createdMessage.text,
      createdAt: new Date().getTime()
    })
  });

  socket.on

});

server.listen(port, () => {
  console.log('Server up on port ' + port);
});
