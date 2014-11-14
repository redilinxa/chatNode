(function(){
    var app = angular.module('chat',[]);
    var socketInit = io.connect();

    app.controller("SocketController", function(){
        this.socket = socketInit;
        this.viewChat = chatStatus;
     });
    chatStatus = false;
    app.controller("AuthController", function(){
        this.user = '';
        // this.socket = socket;
        this.addUser = function(socket) {
                socket.emit("new user", this.user, function(data){
                    //display error
                });
        };
     });
    app.controller("NewMessageController", function(){
        this.message = '';
        // this.socket = socket;
        this.addMessage = function(socket) {
            this.socket.emit("new message", this.message, function(data){
            });
        };
     });
     app.controller("AllUsersController", function(){
        this.usernames = [];
        // chatStatus = this.st;
        socketInit.on('usernames', function(data, chatStatus){
            console.log(chatStatus);
            chatStatus = true;
            this.usernames = data;
            console.log(chatStatus);
        });
    });
     app.controller("AllMessagesController", function(){
        this.messages = [];
        socketInit.on('new message', function(data){
            this.messages.push(data);
        });
    });
    //  app.controller("AllMessagesController", function(){
    //     this.messages = [];
    //     socket.on('whisper', function(data){
    //         this.messages.push(data);
    //     });
    // });
})();