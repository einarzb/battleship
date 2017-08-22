//connection
var socket = io.connect('http://localhost:3000')

var username;
var playerId;
var room = "mainChat";

//for chat
socket.on('connect', function() {
   socket.emit('room', room);
});


//submit new user
document.getElementById("submitBtn").addEventListener("click", function(){
    username = document.getElementById("username").value;
    playerId = socket.id;

    //server
    socket.emit('username',username);
    socket.emit('playerId',playerId);

    //ui
    document.getElementById("greet").innerText = "Hello " + username + "," + '\n please choose an opponent';
    var loginInput = document.getElementById("username").style.visibility = "hidden";
    var subBtn = document.getElementById("submitBtn").style.visibility = "hidden";
    var chooseOpp = document.getElementById("chooseOpp").style.visibility = "visible";
});


//broadcasting so that you won't play against yourself
  socket.on('return_username',function(username){
      populateOpponent(username);
  });

//broadcasting message to pair of rival and user
  socket.on('connectGame', (fleet) => {
    console.log(fleet);
    playGame(fleet);
  });

//select opponent to play with
  document.getElementById("selectPlayerBtn").addEventListener("click", function(){
      //ui
      var opponent = document.getElementById("playerList").value;
      document.getElementById("greet").innerText = "Hello " + username + "," + "\n you chose to play with " + opponent + "\n goodluck!";
      var chooseOpp = document.getElementById("chooseOpp").style.visibility = "hidden";
      //server
      socket.emit('opponent',opponent, username);

      //once opponent is choosen the game starts
      var startGame = opponent;
      socket.emit('startGame',startGame);
  });

/*********** populate opponents list *************/
function populateOpponent(username){
  //ui
  var select = document.getElementById("playerList")
  var option = document.createElement("option");
  option.appendChild(document.createTextNode(username));
  select.appendChild(option);

  //printing messages to chat
  socket.on('message', function(data){
    var chat = document.getElementById("chat").innerText = username + ":" + data;
  })
}

function playGame(fleet){
  battleShip.setShipsInBoard(fleet);
}
