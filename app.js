var express = require("express"),
app = express(),
server = require('http').createServer(app),
io = require('socket.io').listen(server);
var AdminSocket = require('./modules/socket_admin.js');
server.listen(3000);
app.use(express.static(__dirname + '/public'));
app.get("/", function(req, res){
    res.sendfile(__dirname+'/index.html');
});
var s = new AdminSocket();
io.sockets.on("connection", function(socket){
    s.new_user(socket, io);
    s.send_message(socket, io);
    s.disconnect(socket, io);
});
