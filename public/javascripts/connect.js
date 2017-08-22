class Connect {
  constructor(){
  this.socket = io.connect('http://localhost:3000');
  }

  checkServerForHit(cell,cellState) {
    this.socket.emit('checkifCellHit', cell, cellState);
  }
}

var connect = new Connect;
