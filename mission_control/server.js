const net = require('net');
const express = require('express');
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port1 = 9998;
const port2 = process.env.PORT || 3010;

app.use("/js", express.static(__dirname + '/js'));

const server = net.createServer(function (socket) {
    console.log("connected");
    socket.on('data', function (data) {
        console.log(data.toString());
        io.emit("data", data.toString());
    });
});
server.listen(port1);

io.on('connection', function(socket){
    console.log("connected through socket.io");
});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

http.listen(port2, function(){
  console.log('listening on *:' + port2);
});
