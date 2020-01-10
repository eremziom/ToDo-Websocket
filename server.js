const express = require('express');
const socket = require('socket.io');

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
  console.log('client with ID:', socket.id, ' has just logged')
  socket.emit('updateData', tasks);
  
  socket.on('addTask', (taskName) => {
    if(!tasks.includes(taskName)){
    tasks.push(taskName);
    socket.broadcast.emit('addTask', taskName);
    }
  });
  socket.on('removeTask', (index, task) => {
    if(tasks.includes(task)){
    tasks.splice(index, 1);
    console.log(tasks)
    socket.broadcast.emit('removeTask', index, task)
    }
  });
});

