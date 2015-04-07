'use strict';
var World = require('../world');
var LifelikeWorld = require('../lifelike-world');

var plans = Object.create(null);
var worlds = Object.create(null);

// #: walls/rocks
// o: critter

plans.simpleMaze = {
  legend: { "#": Wall, "o": BouncingCritter },
  plan: [
    "##########",
    "#o       #",
    "######## #",
    "#        #",
    "#o########",
    "#        #",
    "######## #",
    "######## #",
    "#   o    #",
    "##########"
  ]
};

plans.marijnsMaze = {
  legend: { "#": Wall, "o": BouncingCritter },
  plan: [
    "############################",
    "#      #    #      o      ##",
    "#                          #",
    "#          #####           #",
    "##         #   #    ##     #",
    "###           ##     #     #",
    "#           ###      #     #",
    "#   ####                   #",
    "#   ##       o             #",
    "# o  #         o       ### #",
    "#    #                     #",
    "############################"
  ]
};

plans.wallFollower = {
  legend : {
    "#": Wall,
    "~": WallFollower,
    "o": BouncingCritter
  },
  plan : [
    "############",
    "#     #    #",
    "#   ~    ~ #",
    "#  ##      #",
    "#  ##  o####",
    "#          #",
    "############"
  ]
};

plans.lifelike = {
  legend: {
    "#": Wall,
    "O": PlantEater,
    "*": Plant
  },
  plan: [
    "############################",
    "#####                 ######",
    "##   ***                **##",
    "#   *##**         **  O  *##",
    "#    ***     O    ##**    *#",
    "#       O         ##***    #",
    "#                 ##**     #",
    "#   O       #*             #",
    "#*          #**       O    #",
    "#***        ##**    O    **#",
    "##****     ###***       *###",
    "############################"
  ]
};

plans.lifelikeSingleEater = {
  legend: {
    "#": Wall,
    "O": PlantEater,
    "*": Plant
  },
  plan: [
  "############################",
  "#####                 ######",
  "##   ***                **##",
  "#   *##**         **     *##",
  "#    ***     O    ##**    *#",
  "#                 ##***    #",
  "#                 ##**     #",
  "#           #*             #",
  "#*          #**            #",
  "#***        ##**         **#",
  "##****     ###***       *###",
  "############################"
  ]
};

function buildWorld(plan) {
  return new World(plan.plan, plan.legend);
}

function buildLifelikeWorld(plan) {
  return new LifelikeWorld(plan.plan, plan.legend);
}

module.exports = {
  plans: plans,
  buildWorld: buildWorld,
  buildLifelikeWorld: buildLifelikeWorld
};
