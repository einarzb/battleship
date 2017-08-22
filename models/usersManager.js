class Users {
    constructor() {
        this.users = [];
        this.sockets = [];
        this.games= [];
        this.currentPlayer;
    }

    getUsers() {
        return this.users;
    }

    addUser(newUser) {
        this.users.push(newUser.username);
        this.sockets.push(newUser.socketId);
    }
      
      
    /*gets opponent id*/
    findOppSocket(data) {
        for (var i = 0; i < this.users.length; ++i) {
            if (data === this.users[i]) {
                return this.sockets[i];
            }
        }
    }
    /*gets opponent name*/
    findUserName(socketid) {
        for (var i = 0; i < this.socketsid.length; ++i) {
            if (socketid === this.socketsid[i]) {
                return this.users[i];
            }

        }
    }



}//end class

var users = new Users;


module.exports = users;
