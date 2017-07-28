'use strict';
const app = require('./app');
const db = require('../db');

const PORT = process.env.port || 3000;  
// Might wanna change ^^^^^ to config.port, but then you must require('config')

const server = app.listen(PORT, () => {
  console.log(`connectHere app listening on port ${PORT}!`);
});

const io = require('socket.io').listen(server);

io.on('connection', function(socket) {
  console.log('a user has connected');
  socket.on('send', message => {
    io.to(message.channel_id).emit('display-message', message);
  });
  socket.on('subscribe', channel => {
    console.log('a user subscribed to channel: ', channel);
    socket.join(channel);
  });
  socket.on('unsubscribe', channel => {
    socket.leave(channel);
  });
});
