const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
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

  // message to user who joined (from admin) text: welcome to the chat app
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

  // socket.broadcast emit from admin, new user joined
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User Joined'));

  socket.on('createMessage', (message, callback) => {
    console.log('Message Created: ', message);
    // emit to every connection
      io.emit('newMessage', generateMessage(message.from, message.text));
      callback();
  });

  socket.on('createLocationMessage', (coords, callback) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    callback();
  });



});

server.listen(port, () => {
  console.log('Server up on port ' + port);
});
