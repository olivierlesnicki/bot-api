'use strict';

var io = require('socket.io')();

var messages = [];

io.on('connection', function (socket) {
  messages.forEach((message) => {
    socket.emit('message', message);
  });

  socket.on('message', function (data) {
    let message = {
      text: data.text,
      emitter: socket.id
    };
    messages.push(message);

    if (data.text.trim() === 'reset') {
      messages = [];
      io.emit('reset');
    } else {
      io.emit('message', message);
    }
  });
});

module.exports = io;
