// init request from client to server
var socket = io();

socket.on('connect', function(){
  console.log('connected to server');

});

socket.on('newMessage', function(message){
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = $('#message-template').html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  })
  $('#messages').append(html);
});

socket.on('disconnect', function(){
  console.log('disconnected from server');
});

socket.on('newLocationMessage', function(message){
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = $('#locaton-message-template').html();
  var html = Mustache.render(template, {
    url: message.url,
    createdAt: message.createdAt,
    from: message.from
  })
  $('#messages').append(html);
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
