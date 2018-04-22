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

  // message to user who joined (from admin) text: welcome to the chat app
  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Welcome to the chat app',
    createdAt: new Date().getTime()
  });

  // socket.broadcast emit from admin, new user joined
  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'New User Joined',
    createdAt: new Date().getTime()
  });

  socket.on('createMessage', (message) => {
    console.log('Message Created: ', message);
    // emit to every connection
      io.emit('newMessage', {
        from: message.from,
        text: message.text,
        createdAt: new Date().getTime()
      });
    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });
  });



});

server.listen(port, () => {
  console.log('Server up on port ' + port);
});
