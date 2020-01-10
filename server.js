const express = require('express');
const socket = require('socket.io');

const app = express();

const tasks = [{name: 'test', id: '00102dxas'}];

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
  
  socket.on('addTask', (newTask) => {
    if(!tasks.find(task => task.id == newTask.id)){
    tasks.push(newTask);
    socket.broadcast.emit('addTask', newTask);
    }
  });
  socket.on('removeTask', (index, task) => {
    if(tasks.find(taskToRemove => taskToRemove.id == task.id)){
    tasks.splice(index, 1);
    socket.broadcast.emit('removeTask', index, task)
    }
  });
});

