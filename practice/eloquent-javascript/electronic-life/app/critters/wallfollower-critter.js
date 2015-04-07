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
