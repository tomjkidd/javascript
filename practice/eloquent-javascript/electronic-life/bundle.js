(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var util = require('../util');
var direction = require('../direction');

function BouncingCritter() {
  this.direction = util.randomElement(direction.directionNames);
};

BouncingCritter.prototype.act = function(view) {
  if(view.look(this.direction) != ' ') {
    this.direction = view.find(' ') || "s";
  }
  return { type: "move", direction: this.direction };
};

module.exports = BouncingCritter;

},{"../direction":6,"../util":10}],2:[function(require,module,exports){
'use strict';

function PlantEater() {
  this.energy = 20;
};

PlantEater.prototype.act = function(context) {
  var space = context.find(' ');
  if(this.energy > 60 && space) {
    return { type: 'reproduce', direction: space };
  }
  var plant = context.find('*');
  if(plant) {
    return { type: 'eat', direction: plant };
  }
  if (space) {
    return { type: 'move', direction: space };
  }
}

module.exports = PlantEater;

},{}],3:[function(require,module,exports){
'use strict';

function Plant() {
  this.energy = 3 + Math.random() * 4;
};

Plant.prototype.act = function (context) {
  if (this.energy > 15) {
    var space = context.find(' ');
    if(space) {
      return { type: 'reproduce', direction: space };
    }
  }
  if (this.energy < 20) {
    return { type: 'grow' };
  }
};

module.exports = Plant;

},{}],4:[function(require,module,exports){
'use strict';
function Wall() {};
module.exports = Wall;

},{}],5:[function(require,module,exports){
'use strict';

var util = require('../util');
var direction = require('../direction');

function dirPlus(dir, n) {
  var index = direction.directionNames.indexOf(dir);
  return direction.directionNames[(index + n + 8) % 8];
}

function WallFollower() {
  this.direction = 's';
};

WallFollower.prototype.act = function(view) {
  var start = this.direction;
  if (view.look(dirPlus(this.direction, -3)) != " ") {
    start = this.direction = dirPlus(this.direction, -2);
  }
  while (view.look(this.direction) != ' ') {
    this.direction = dirPlus(this.direction, 1);
    if(this.direction == start) break;
  }
  return { type: "move", direction: this.direction };
};

module.exports = WallFollower;

},{"../direction":6,"../util":10}],6:[function(require,module,exports){
'use strict';
var Vector = require('../app/vector');

var direction = Object.create(null);
direction.directions = {
  'n': new Vector(0, -1),
  'ne': new Vector(1, -1),
  'e': new Vector(1, 0),
  'se': new Vector(1, 1),
  's': new Vector(0, 1),
  'sw': new Vector(-1, 1),
  'w': new Vector(-1, 0),
  'nw': new Vector(-1, -1)
};

direction.directionNames = 'n ne e se s sw w nw'.split(' ');

module.exports = direction;

},{"../app/vector":11}],7:[function(require,module,exports){
'use strict';

// grid: used to represent the grid and it's contents
function Grid(width, height) {
  // using a single array to map the space
  // This leads to x + width * y to access (x,y)
  this.space = new Array(width * height);
  this.width = width;
  this.height = height;
};

Grid.prototype.isInside = function(vector) {
  return vector.x >= 0 && vector.x < this.width &&
  vector.y >= 0 && vector.y < this.height;
}

Grid.prototype.get = function(vector) {
  return this.space[vector.x + this.width * vector.y];
};

Grid.prototype.set = function(vector, value) {
  this.space[vector.x + this.width * vector.y] = value;
};

Grid.prototype.forEach = function(f, context) {
  for (var y = 0; y < this.height; y++) {
    for (var x = 0; x < this.width; x++) {
      var value = this.space[x + y * this.width];
      if (value != null){
        f.call(context, value, new Vector(x,y));
      }
    }
  }
};

module.exports = Grid;

},{}],8:[function(require,module,exports){
'use strict';

var World = require('../app/world');

function LifelikeWorld(map, legend) {
  World.call(this, map, legend);
}
LifelikeWorld.prototype = Object.create(World.prototype);

var actionTypes = Object.create(null);

actionTypes.grow = function(critter) {
  critter.energy += 0.5;
  return true;
};

actionTypes.move = function(critter, vector, action) {
  var dest = this.checkDestination(action, vector);
  if (dest == null || critter.energy <=1 || this.grid.get(dest) != null) {
    return false;
  }
  critter.energy -= 1;
  this.grid.set(vector, null);
  this.grid.set(dest, critter);
  return true;
};

actionTypes.eat = function (critter, vector, action) {
  var dest = this.checkDestination(action, vector);
  var atDest = dest != null && this.grid.get(dest);
  if(!atDest || atDest.energy == null) {
    return false;
  }
  critter.energy += atDest.energy;
  this.grid.set(dest, null);
  return true;
};

actionTypes.reproduce = function(critter, vector, action) {
  var baby = util.elementFromChar(this.legend, critter.originChar);
  var dest = this.checkDestination(action, vector);
  if (dest == null || critter.energy <= 2 * baby.energy || this.grid.get(dest) != null) {
    return false;
  }
  critter.energy -= 2 * baby.energy;
  this.grid.set(dest, baby);
  return true;
};

LifelikeWorld.prototype.letAct = function(critter, vector) {
  var action = critter.act(new View(this, vector));
  var handled = action && action.type in actionTypes && actionTypes[action.type].call(this, critter, vector, action);

  if(!handled) {
    critter.energy -= 0.2;
    if (critter.energy <= 0) {
      this.grid.set(vector, null);
    }
  }
};

module.exports = LifelikeWorld;

},{"../app/world":13}],9:[function(require,module,exports){
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

},{"../lifelike-world":8,"../world":13}],10:[function(require,module,exports){
'use strict';

var util = Object.create(null);

util.randomElement = randomElement;
util.elementFromChar = elementFromChar;
util.charFromElement = charFromElement;

module.exports = util;

function randomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
};

function elementFromChar(legend, ch) {
  if (ch == ' ')
    return null;
  var element = new legend[ch]();
  element.originChar = ch;
  return element;
};

function charFromElement(element) {
  if (element == null)
    return ' ';
  else
    return element.originChar;
};

},{}],11:[function(require,module,exports){
"use strict"

// vector: used to represent space
function Vector(x, y) {
  this.x = x;
  this.y = y;
};

Vector.prototype.plus = function(other) {
  return new Vector(this.x + other.x, this.y + other.y);
};

module.exports = Vector

},{}],12:[function(require,module,exports){
'use strict';

var direction = require('../app/direction');
var util = require('../app/util');

function View(world, vector) {
  this.world = world;
  this.vector = vector;
};

View.prototype.look = function(dir) {
  var target = this.vector.plus(direction.directions[dir]);
  if (this.world.grid.isInside(target)) {
    return util.charFromElement(this.world.grid.get(target));
  } else {
    return '#';
  }
};

View.prototype.findAll = function (ch) {
  var found = [];
  for (var dir in direction.directions) {
    if (this.look(dir) == ch) {
      found.push(dir)
    }
  }
  return found;
};

View.prototype.find = function (ch) {
  var found = this.findAll(ch);
  if(found.length == 0) return null;
  return util.randomElement(found);
};

module.exports = View;

},{"../app/direction":6,"../app/util":10}],13:[function(require,module,exports){
'use strict';
var Vector = require('../app/vector');
var Grid = require('../app/grid');
var util = require('../app/util');
var direction = require('../app/direction');

// world: used to represent the whole world
function World(map, legend) {
  var grid = new Grid(map[0].length, map.length);
  this.grid = grid;
  this.legend = legend;

  map.forEach(function(line, y) {
    for (var x = 0; x < line.length; x++) {
      grid.set(new Vector(x,y), util.elementFromChar(legend, line[x]));
    }
  });
};

World.prototype.toString = function() {
  var output = '';
  for (var y = 0; y < this.grid.height; y++) {
    for (var x = 0; x < this.grid.width; x++) {
      var element = this.grid.get(new Vector(x,y));
      output += util.charFromElement(element);
    }
    output += '\n';
  }
  return output;
};

World.prototype.turn = function() {
  var acted = [];
  this.grid.forEach(function(critter, vector){
    if (critter.act && acted.indexOf(critter) == -1) {
      acted.push(critter);
      this.letAct(critter, vector);
    }
  }, this);
};

World.prototype.letAct = function(critter, vector) {
  var action = critter.act(new View(this, vector));
  if (action && action.type == 'move') {
    var dest = this.checkDestination(action, vector);
    if (dest && this.grid.get(dest) == null) {
      this.grid.set(vector, null);
      this.grid.set(dest, critter);
    }
  }
};

World.prototype.checkDestination = function (action, vector) {
  if (direction.directions.hasOwnProperty(action.direction)) {
    var dest = vector.plus(direction.directions[action.direction]);
    if (this.grid.isInside(dest))
      return dest;
  }
};

module.exports = World;

},{"../app/direction":6,"../app/grid":7,"../app/util":10,"../app/vector":11}],14:[function(require,module,exports){

Vector = require('./app/vector');
Grid = require('./app/grid');
View = require('./app/view');
World = require('./app/world');
Wall = require('./app/critters/wall');
BouncingCritter = require('./app/critters/bouncing-critter');
WallFollower = require('./app/critters/wallfollower-critter');
Plant = require('./app/critters/plant');
PlantEater = require('./app/critters/plant-eater');
util = require('./app/util');
plans = require('./app/plans/plans');

// squares used for space
// turns used for time

// plan: array of strings that lays out the world, one character per square. Used to create a World object

var world = plans.buildLifelikeWorld(plans.plans.lifelikeSingleEater);

function updateWorld() {
  world.turn();
  //var e = document.createTextNode(world.toString());
  var s = document.getElementById('simulation').innerHTML = world.toString();
  console.log(world.toString());
  //s.appendChild(e);
  setTimeout(updateWorld, 50);
}

updateWorld();

},{"./app/critters/bouncing-critter":1,"./app/critters/plant":3,"./app/critters/plant-eater":2,"./app/critters/wall":4,"./app/critters/wallfollower-critter":5,"./app/grid":7,"./app/plans/plans":9,"./app/util":10,"./app/vector":11,"./app/view":12,"./app/world":13}]},{},[14]);
