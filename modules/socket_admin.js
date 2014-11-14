
function AdminSocket(){
    this.users = {};
    this.new_user = function(socket, io) {
                        me = this;
                        socket.on('new user', function(data, callback){
                            if (data in me.users){
                                callback(false);
                            }else{
                                callback(true);
                                socket.nickname = data;
                                me.users[socket.nickname] = socket;
                                io.sockets.emit('usernames', Object.keys(me.users));
                            }
                        });
                    };
    this.send_message = function(socket, io) {
                        me = this;
                        socket.on('send message', function(data, callback){
                            var msg= data.trim();
                            if (msg.substr(0,3) === "/w "){
                                msg = msg.substr(3);
                                var ind = msg.indexOf(" ");
                                if (ind !== -1){
                                    var name= msg.substring(0, ind);
                                    var msg= msg.substring(ind+1);
                                    if (name in me.users){
                                        me.users[name].emit('whisper', {msg:msg, nick:socket.nickname});
                                        console.log("whisper!");
                                    }else{
                                        callback("Error: Please enter a valid user!!!");
                                    }
                                }else{
                                    callback("Error: Please enter a message for your whisperer!!!");
                                }
                            }else{
                                io.sockets.emit("new message", {msg:msg, nick:socket.nickname});
                            }
                            // socket.broadcast.emit("new message", data); everyone but me
                        });
                    };
    this.disconnect = function(socket, io) {
                        me = me;
                        socket.on('disconnect',function(data){
                            if(!socket.nickname) return;
                            delete me.users[socket.nickname];
                            io.sockets.emit('usernames', Object.keys(me.users));
                        });
    };


};

module.exports = AdminSocket;