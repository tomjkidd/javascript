'use strict';
import { Edge } from 'lib/graph/Edge'

class BridgeEdge extends Edge {
  constructor(nodeA, nodeAPort, nodeB, nodeBPort){
    super(nodeA, nodeB)
    this.nodeAPort = nodeAPort;
    this.nodeBPort = nodeBPort;
  }
  toString() {
    return `{src: (${this.nodeA.id}, P${this.nodeAPort}) dst: (${this.nodeB.id}, P${this.nodeBPort})}`;
  }
}

export { BridgeEdge }
