var battleShip;
window.onload = function(){
    battleShip = new GameSetup('myCanvas');
    battleShip.createBoard();
    battleShip.createBoard(670);
    battleShip.drawTiles(2); //draw 2 boards
    //battleShip.typeMission(str, 25,25,32,10);
} //end onload

//var str = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.  Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.";

class GameSetup {
    constructor(canvas, size = 11) {
      //get html canvas
      this.canvas = document.getElementById(canvas);
      if(!this.canvas.getContext) throw Error('no canvas');
      this.ctx = this.canvas.getContext('2d'); //default

      //initialize canvas
      this.width = this.canvas.width = this.canvas.clientWidth;
      this.height = this.canvas.height = this.canvas.clientHeight;

      //initialize board
      this.size = size; //boardsize
      this.board = [];
      this.tile = Math.floor(Math.min(this.height,this.width) / (this.size)); //60 is tile size

      //states
      this.hit = "HIT";
      this.miss = "MISS";
      this.shipStatus = "ship";

      //event listener
      this.canvas.addEventListener('click', (event) => { //the arrow saves the this it's a CB
          var mouseX = event.offsetX;
          var mouseY = event.offsetY;
          this.onClick(event);
      });
    }//end constructor

//design crap
    // typeMission(str, startX, startY, lineHeight, padding){
    //   var cursorX = startX || 0;
    //   var cursorY = startY || 0;
    //   var lineHeight = lineHeight || 32;
    //   padding = padding || 10;
    // }

    /****************************************************** DRAWING BOARD ************************************/
   createBoard(offsetX=0, offsetY=0){
       for(var row=0; row < this.size; ++row) {
         for(var col=0; col < this.size; ++col){
           var tile = new Cell(offsetX + this.tile * row, offsetY + this.tile * col, this.tile, this.tile);
           this.board.push(tile);
         }
       }
   }

//needs to start with 121 == > for using right board
   onClick(event) {
    for (let cell = 121; cell < (this.size * this.size)*2; ++cell) {

        if (this.board[cell].clickedCell(event.offsetX, event.offsetY)) {
          console.log(cell);
          this.drawCurrentCell(cell);
          var currentCell;
          ///player board detected cells
          if(cell < 143 && cell > 132){
            var currentCell = "A" + (cell-132);
          }
          if(cell < 154 && cell > 143){
              var currentCell = "B" + (cell-143);
              }
          if(cell < 165 && cell > 154){
               var currentCell = "C" + (cell-154);
            }
          if(cell < 176 && cell > 165){
               var currentCell = "D" + (cell-165);
           }
           if(cell < 187 && cell > 176){
               var currentCell = "E" + (cell-176);
            }
          if(cell < 198 && cell > 187){
               var currentCell = "F" + (cell-187);
            }
          if(cell < 209 && cell > 198){
               var currentCell = "G" + (cell-198);
          }
          if(cell < 220 && cell > 209){
               var currentCell = "H" + (cell-209);
          }
          if(cell < 231 && cell > 220){
               var currentCell = "I" + (cell-220);
          }
          if(cell < 242 && cell > 231){
               var currentCell = "J" + (cell-231);
          }
      } // end if
   }//end for loop
        //append cell status to UI
        if (currentCell === undefined) {
           document.getElementById("cellStatus").innerText = " ";
            return;
        } else {
           document.getElementById("cellStatus").innerText = "You hit " + currentCell;
        }
  }//end onclick function

    drawCurrentCell(cell){
            // for(var cell = 121; cell < 231; cell += 11){
            //    console.log(cell);
            // }

            if (cell === undefined || cell === 121 || cell === 132 || cell === 143) {
                return;
            }
            var cellData = this.board[cell];
            var cellState = cellData.getShipStatus();


            //console.log(cellData.shipStatus)
            //if cellState empty
            if (!(cellState === 'MISS' || cellState === 'HIT' || cellState === 'ship')) {
                // if cell is empty -- append miss
                cellData.setShipStatus(this.miss);
                cellData.drawShipStates(this.ctx);
                return;
            }
            //HIT
            cellData.setShipStatus(this.hit);
            cellData.drawShipStates(this.ctx);
            //check in server
            connect.checkServerForHit(cell,cellData.shipStatus);


        if(cell === 55 || cell === 66 || cell === 77 || cell === 88 || cell === 99 || cell === 44 || cell === 33 || cell === 22 || cell === 1){
                console.log("cant press here");
                //SHOULD NOT PRINT HIT ON THOSE CELLS
            }
    }

    drawTiles(boardsNumber) {
         this.boardsNumber = boardsNumber;
         for (var indexedTile = 0; indexedTile < (this.size * this.size) * boardsNumber; ++indexedTile) {
             var tileDraw = this.board[indexedTile];
             //canvas action
           this.ctx.save();
                this.ctx.strokeStyle="lime";
                this.ctx.translate(tileDraw.x, tileDraw.y);
                this.ctx.strokeRect(0, 0, tileDraw.width, tileDraw.height);
           this.ctx.restore();
         }
         //letters cordinates
         this.ctx.beginPath();
             this.ctx.fillStyle = "#fff";
             this.ctx.textAlign = "center";
             this.ctx.font = "30px Arial";
             //opponent board
             this.ctx.fillText("A",90,40);
             this.ctx.fillText("B",150,40);
             this.ctx.fillText("C",210,40);
             this.ctx.fillText("D",270,40);
             this.ctx.fillText("E",330,40);
             this.ctx.fillText("F",390,40);
             this.ctx.fillText("G",450,40);
             this.ctx.fillText("H",510,40);
             this.ctx.fillText("I",570,40);
             this.ctx.fillText("J",630,40);
             this.ctx.translate(670,0);
             //player board
             this.ctx.fillText("A",90,40);
             this.ctx.fillText("B",150,40);
             this.ctx.fillText("C",210,40);
             this.ctx.fillText("D",270,40);
             this.ctx.fillText("E",330,40);
             this.ctx.fillText("F",390,40);
             this.ctx.fillText("G",450,40);
             this.ctx.fillText("H",510,40);
             this.ctx.fillText("I",570,40);
             this.ctx.fillText("J",630,40);
         this.ctx.stroke();
         //numbers cordinates
         this.ctx.beginPath();
             this.ctx.fillStyle = "#fff";
             this.ctx.textAlign = "center";
             this.ctx.font = "30px Arial";
             //opponent board
             this.ctx.fillText("1",30,100);
             this.ctx.fillText("2",30,160);
             this.ctx.fillText("3",30,220);
             this.ctx.fillText("4",30,280);
             this.ctx.fillText("5",30,340);
             this.ctx.fillText("6",30,400);
             this.ctx.fillText("7",30,460);
             this.ctx.fillText("8",30,520);
             this.ctx.fillText("9",30,580);
             this.ctx.fillText("10",30,640);
             this.ctx.translate(-670,0);
             //player board
             this.ctx.fillText("1",30,100);
             this.ctx.fillText("2",30,160);
             this.ctx.fillText("3",30,220);
             this.ctx.fillText("4",30,280);
             this.ctx.fillText("5",30,340);
             this.ctx.fillText("6",30,400);
             this.ctx.fillText("7",30,460);
             this.ctx.fillText("8",30,520);
             this.ctx.fillText("9",30,580);
             this.ctx.fillText("10",30,640);
         this.ctx.stroke();
         //round
           this.ctx.beginPath();
             this.ctx.strokeStyle = "#00ff00"; //stroke color
             this.ctx.lineWidth = 3;
             this.ctx.arc(345,356,230,0,Math.PI*2, false);
           this.ctx.stroke();

         //round
           this.ctx.beginPath();
             this.ctx.strokeStyle = "#00ff00"; //stroke color
             this.ctx.lineWidth = 2;
             this.ctx.arc(345,356,190,0,Math.PI*2, false);
           this.ctx.stroke();
     }

    setShipsInBoard(fleet) {
        if (fleet) {
            for (var key in fleet) {
                var battleship = fleet[key];
                for (var i = 0; i < battleship.length; i++) {
                    this.fillShipsInBoard(battleship[i]);
                }
            }
        }
    }

    fillShipsInBoard(cell){
        if (cell === undefined) {
            return;
        }
        var cellData = this.board[cell];
        var cellState = cellData.getShipStatus();
        //if cellState is not vacant
        if (cellState === 'MISS' || cellState === 'HIT' || cellState === 'ship') {
        return;
        }
        cellData.setShipStatus(this.shipStatus);
        cellData.drawShipStates(this.ctx);
    }
} //end class of GameSetup



/******************************************************* CREATE CELL ***************************/
class Cell {
    constructor(x, y, w, h) {

      this.canvas = document.getElementById('myCanvas');
      if(!this.canvas.getContext) throw Error('no canvas');
      this.ctx = this.canvas.getContext('2d'); //default

        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.shipStatus = ' ';
    }
    //inner function of constructor that gets mouse cords
     clickedCell(x, y) {
        return (
          (x < this.width + this.x && x > this.x) && (y < this.height + this.y && y > this.y)
        ); //false
      }

    /**************** ship status ***************************/
    setShipStatus(status) {
       this.shipStatus = status;
    }

    getShipStatus() {
          return this.shipStatus;
      }

    drawShipStates(ctx) {
          if (this.shipStatus === 'HIT') {
              this.setHit(ctx);
          }

          if (this.shipStatus === 'MISS') {
              this.setMiss(ctx);
          }

          if (this.shipStatus === 'ship') {
              this.createShip(ctx);
          }
      }

    setHit(ctx) { //hit
        this.ctx.clearRect(this.x,this.y,this.width-1,this.height-2);
        this.ctx.shadowColor = "rgba(0,255,0,0.8)";
        this.ctx.shadowBlur = 10;
        this.ctx.fillStyle = "lime";
        this.ctx.font = "18px Arial";
        this.ctx.globalCompositeOperation = "lighter"
        this.ctx.fillText("HIT",this.x+30,this.y+40);
    }
   setMiss(ctx) { //miss
      this.ctx.shadowColor = "rgba(0,255,0,0.8)";
      this.ctx.shadowBlur = 10;
      this.ctx.fillStyle = "lime";
      this.ctx.font = "18px Arial";
      this.ctx.globalCompositeOperation = "lighter"
      this.ctx.fillText("MISS",this.x+30,this.y+40);
     }
    createShip(ctx){
      this.ctx.shadowColor = "rgba(0,255,0,0.8)";
      this.ctx.shadowBlur = 10;
      this.ctx.fillStyle = "lime";
      this.ctx.font = "18px Arial";
      this.ctx.globalCompositeOperation = "lighter"
      this.ctx.fillText("SHIP",this.x+30,this.y+40);
    }

}
