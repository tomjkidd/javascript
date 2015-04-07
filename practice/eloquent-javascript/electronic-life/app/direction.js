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
