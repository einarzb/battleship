
class Game {
  constructor(id1,id2){
      this.playerId = id1;
      this.oppId = id2;
      this.currentPlayer;
      this.fleetBuilder();
  }


/* fleet constructor - array of 2 objects with player name an his fleet */

fleetBuilder(){
  this.playersFleet = [
    {
      id: this.playerId,
      fleet: {
      dakar0:[37,48,59,70,81],
      dakar1:[89,90],
      dakar2:[111],
      dakar3:[19,30,41],
      dakar4:[96,97,98],
      dakar5:[12,23],
      dakar6:[94,105],
      dakar7:[32,43,54],
      dakar8:[16,17]}
    },
    {
    id:this.oppId,
    fleet: {
    dakar0:[115,116,117],
    dakar1:[37,48,59,70],
    dakar2:[60,61,62],
    dakar3:[20,31,42,53,64],
    dakar4:[18,29,40],
    dakar5:[96,97,98],
    dakar6:[78,89,100],
    dakar7:[13,24],
    dakar8:[72,73]
   }
}];
 }

}//end class

module.exports = Game;
