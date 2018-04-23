// init request from client to server
var socket = io();

socket.on('connect', function(){
  console.log('connected to server');

});

socket.on('newMessage', function(message){
  console.log(message);
  var li = $('<li></li>').text(`${message.from} : ${message.text}`);
  $('#messages').append(li);
});

socket.on('disconnect', function(){
  console.log('disconnected from server');
});

$('#message-form').on('submit', function(e){
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'User',
    text: $('#message-form [name=message]').val()
  }, function(){

  });
});
