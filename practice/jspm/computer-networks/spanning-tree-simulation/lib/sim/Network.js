'use strict';

import { BridgeEdge } from 'lib/sim/BridgeEdge'
import { BridgeNode } from 'lib/sim/BridgeNode'
import { Graph } from 'lib/graph/Graph'

class Network {
  constructor(edgelist){
    this.graph = new Graph();
    this.nodeList = this.getNodeList(edgelist);
    /* Each edge specifies nodeAId, nodeAPort, nodeBId, nodeBPort. There is no validation! */
    this.edgeList = edgelist;
    this.init();
  }
  init() {
    // Create nodes in the network
      this.nodeList.forEach(id => this.graph.nodes.set(id, new BridgeNode(id)));

    // Create edges in the network
    this.edgeList.forEach(([src, nodeAPort, dst, nodeBPort]) => this.graph.edges.set(this.getEdgeKey(src,dst), new BridgeEdge(this.getNode(src), nodeAPort, this.getNode(dst), nodeBPort)));

    // Use edges to configure each node with it's connections
    this.getNodes().forEach(node => {
      this.getEdgesForNode(node).forEach(edge => {
        node.addConnection(edge);
      });
    });
    // The nodes in the network are now configured
  }
  getNodeList(edgelist) {
      var nodelist = [];
    edgelist.forEach(([nodeA, portA, nodeB, portB]) => {
      if (nodelist.indexOf(nodeA) == -1) {
        nodelist.push(nodeA);
      }
      if (nodelist.indexOf(nodeB) == -1) {
        nodelist.push(nodeB);
      }
    });
    nodelist.sort();
    return nodelist;
  }
  getNode(id) {
    return this.graph.nodes.get(id);
  }
  getNodes() {
    return [...this.graph.nodes.values()];
  }
  getEdgesForNode(node) {
    return [...this.graph.edges.values()].filter(x => x.nodeA.id == node.id || x.nodeB.id == node.id);
  }
  getEdgeKey(nodeAId, nodeBId) {
    return `${nodeAId},${nodeBId}`;
  }
  runSimulation() {
      // Init each node so that it starts sending messages
      [...this.graph.nodes.values()].forEach(node => {
          node.init();
      });
  }
}

export { Network }
