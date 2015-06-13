'use strict';

class Edge {
  constructor(nodeA, nodeB) {
    this.nodeA = nodeA;
    this.nodeB = nodeB;
  }
  toString() {
    return `(${this.nodeA.id},${this.nodeB.id})`;
  }
}

export { Edge }
