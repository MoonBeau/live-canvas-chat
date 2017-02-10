let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

io.on('connection', (socket) => {
  console.log('User Connected...');

  socket.on('disconnect', function () {
    console.log('User Disconnected...');
  });
  socket.on('add-message', (message) => {
    io.emit('message', {
      type:'new-message',
      text: message
    });
    console.log('Message sent...');
  });
  socket.on('drawClick', (data) => {
      socket.broadcast.emit('draw', {
        x: data.x,
        y: data.y,
        type: data.type
      });
      console.log('Drawing transmitting...');
  });

});

http.listen(8000, () => {
  console.log('Server is Running away with Port 8000');
});
