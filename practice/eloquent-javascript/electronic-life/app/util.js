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
