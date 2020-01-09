const express = require('express');
const socket = require('socket.io');
const path = require('path');

const app = express();

const server = app.listen( 8000, () => {
  console.log('server is runing on Port: 8000');
})

app.use(( req, res ) => {
  res.send('404 - not found');
});