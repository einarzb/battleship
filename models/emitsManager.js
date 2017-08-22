//192.168.0.254:3000
var connection = require('./socketManager');
var gamers = require('./gameManager');
var users = require('./usersManager');

var room = "mainChat";

var emitManager = function(socket, io) {

/**** SENDS USERNAME AND ID INVOKED BY SUBMIT BUTTON****/
  socket.on('username', function(username){
      socket.broadcast.emit('return_username',username);
      var newUser = {};
      newUser.username = username;
      newUser.socketId = socket.id;
      var userForServer = users.addUser(newUser);
      updatePlayers(socket,io);
  });

  socket.on('playerId', function(playerId){
      console.log('userID is: ' + playerId);
  });

  
/**** communication between two users (player and rival) INVOKED BY SELECT ****/
  /*sending boards and pushing players to game array*/
function updatePlayers(socket,io){
  socket.on('startGame',(data) => {
    console.log(data + " is the opponent that was selected - let the game begin");
    var usersConnected = users.getUsers();
    /*get sockets*/
    var socketOpponent = users.findOppSocket(data);
    var userId = socket.id;
    /*send ids to game initialize*/
    var currentGame = new gamers(socketOpponent, userId);
    var game = currentGame.playersFleet;
    users.games.push(currentGame); //push users names,socket id and fleet to games array
    currentGame.currentPlayer = game[0].id; //first player socketsid

    /*************************** SENDING BOARDS ******************************************/
    //opponent address
    io.to(game[0].id).emit('connectGame', game[0].fleet);
    //user address
    io.to(game[1].id).emit('connectGame', game[1].fleet);
  });
}
  /*check hit*/ 
  socket.on('checkifCellHit', function(cell,cellState){
    console.log(cell)
    console.log(cellState)
  });

 // opponent choosen!
  socket.on('opponent', function(opponent, username){
      var clients = users.getUsers();
      console.log('status: opponent is ' + opponent + ' playing against ' + username);
    });


/**** disconnect WHEN PAGE REFRESH ****/
  socket.on('disconnect', function(){
    console.log('user ' + socket.id + ' disconnected');
  });



  // //chat room - users auto join it
  //   socket.on('room', function(room){
  //     socket.join(room)
  //   });
  // //the text in chat
  //   socket.in(room).emit('message', 'whats up')

}



module.exports = emitManager;
