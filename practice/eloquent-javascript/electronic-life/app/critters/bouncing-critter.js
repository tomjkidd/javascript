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
