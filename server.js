const express = require('express');
const socket = require('socket.io');
const path = require('path');

const app = express();

const tasks = [];

const server = app.listen( 8000, () => {
  console.log('server is runing on Port: 8000');
})

app.use(( req, res ) => {
  res.send('404 - not found');
});

const io = socket(server);

io.on('connection', (socket) => {
  socket.emit('updateData', tasks);
  socket.on('addTask', (taskName) => {
    tasks.push[taskName]
    socket.broadcast.emit('addTask', taskName);
  });
  socket.on('removeTask', (taskName) => {
    for(let task of tasks){
      if(task == taskName){
        tasks.splice(tasks.indexOf(task));
        socket.broadcast.emit('removeTask', taskName)
      };
    };
  });
});

