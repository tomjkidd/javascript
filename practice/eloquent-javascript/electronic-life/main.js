
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
