let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

io.on('connection', (socket) => {
  console.log('User Connected...');

  socket.on('disconnect', function () {
    console.log('User Disconnected...');
  });
  socket.on('add-message', (message, username) => {
    io.emit('message', {
      type:'new-message',
      text: message,
      username: username
    });
    console.log('Message sent...');
  });
  socket.on('mouseClick', (data) => {
      console.log('Received: "mouseClick" ' + data.x + ',' + data.y);
      socket.broadcast.emit('mouseClick', data);
      console.log('Drawing transmitted...');
  });

});

http.listen(8000, () => {
  console.log('Server is Running away with Port 8000');
});
