// init request from client to server
var socket = io();

socket.on('connect', function(){
  console.log('connected to server');

});

socket.on('newMessage', function(message){
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var li = $('<li></li>').text(`${message.from} [${formattedTime}] : ${message.text}`);
  $('#messages').append(li);
});

socket.on('disconnect', function(){
  console.log('disconnected from server');
});

socket.on('newLocationMessage', function(message){
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var li = $('<li></li>');
  var a = $('<a target="_blank">My Current Location</a>');
  li.text(`${message.from} [${formattedTime}]: `);
  a.attr('href', message.url);
  li.append(a);
  $('#messages').append(li);
});

$('#message-form').on('submit', function(e){
  e.preventDefault();
  var messageTextbox = $('[name=message]');
  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()
  }, function(){
    // clear value
    messageTextbox.val('');
  });
});

var locationButton = $('#send-location');
locationButton.on('click', function(){
  if(!navigator.geolocation){
    return alert('Geolocation not supported by your browser');
  }
  locationButton.attr('disabled', 'disabled').text('sending location...');
  navigator.geolocation.getCurrentPosition(function(position){
    locationButton.prop('disabled', null).text('send location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function(){
    locationButton.prop('disabled', null).text('send location');
    // if user presses deny
    alert('Unable to fetch location.');
  });
});
