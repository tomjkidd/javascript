import { Node } from "modules/Node"
import { Edge } from "modules/Edge"
import { Graph } from "modules/Graph"

function getEdgeKey(nodeAId, nodeBId) {
  return `${nodeAId},${nodeBId}`;
}

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

/* Used to communicate from host to host */
class Message {
  constructor(from, root, d) {
    /* Id of the bridge sending the message */
    this.fromId = from;
    /* Id of what the sending bridge believes is the root */
    this.rootId = root;
    /* What sending bridge believes is the distance from the root */
    this.distanceFromRoot = d;
  }
  toString() {
      return `Message from Node ${this.fromId}: Root = ${this.rootId} Distance = ${this.distanceFromRoot}`
  }
  copyWithIncrement() {
      return new Message(this.fromId, this.rootId, this.distanceFromRoot + 1);
  }

  copy() {
      return new Message(this.fromId, this.rootId, this.distanceFromRoot);
  }
}

class Connection {
  constructor(hostId, edge) {
    // In this project, each link creates two Connections
    // Each connection is one way
    let isNodeA = edge.nodeA.id == hostId;
    let hostNode = isNodeA ? edge.nodeA : edge.nodeB;
    let hostPort = isNodeA ? edge.nodeAPort : edge.nodeBPort;
    let remoteNode = isNodeA ? edge.nodeB : edge.nodeA;
    let remotePort = isNodeA ? edge.nodeBPort : edge.nodeAPort;

    this.hostNode = hostNode;
    this.hostPort = hostPort;
    this.remoteNode = remoteNode;
    this.remotePort = remotePort;
    // Initially the best message is the host's own message with default settings
    this.bestMessage = hostNode.createMessage();
  }
  toString() {
    return `Host ${this.hostNode.id}, Remote ${this.remoteNode.id}`;
  }
  isBetterMessage(msg) {
    let idSmallerThanBest = msg.rootId < this.bestMessage.rootId;
    let idSameButDistanceSmallerThanBest = msg.rootId == this.bestMessage.rootId && msg.distanceFromRoot < this.bestMessage.distanceFromRoot;
    let idAndDistanceSameButFromIdSmallerThanBest = msg.rootId == this.bestMessage.rootId && msg.distanceFromRoot == this.bestMessage.distanceFromRoot && msg.fromId < this.bestMessage.rootId;

    if (idSmallerThanBest
        || idSameButDistanceSmallerThanBest
        || idAndDistanceSameButFromIdSmallerThanBest) {
      return true;
    } else {
      return false;
    }
  }

  isNotDesignated(msg) {
    let fromDistanceLessThanBest = msg.distanceFromRoot < this.bestMessage.distanceFromRoot;
    let sameDistanceButFromIdSmaller = msg.distanceFromRoot == this.bestMessage.distanceFromRoot && msg.fromId < this.hostNode.id;

    return fromDistanceLessThanBest
    || sameDistanceButFromIdSmaller;
  }

  send(msg) {
    // When sending a message, use the bridge's id
    msg.fromId = this.hostNode.id;
    this.remoteNode.receiveMessage(msg);
  }

  receive(msg) {
    console.log(`Host Node ${this.hostNode.id} received : ${msg} from Remote Node ${this.remoteNode.id}`)
    var isNotDesignated = this.isNotDesignated(msg);
    var isBetterMessage = this.isBetterMessage(msg);
    let isNotRoot = !this.hostNode.isRoot || msg.rootId < this.hostNode.rootId

    // Is this a best message?
    if(isBetterMessage) {
      this.bestMessage = msg.copyWithIncrement();
      console.log(`Best Message for Host${this.hostNode.id} P${this.hostPort}: ${msg}`);
    }

    // Analyze message for root/designation effects
    if(isNotRoot) {
      console.log(`Host ${this.hostNode.id} is no longer considered a root`);
      this.hostNode.isRoot = false;
    }
    if(isNotDesignated) {
      console.log(`Host ${this.hostNode.id} is no longer designated`);
      this.hostNode.isDesignated = false;
    }

    // Does the message need to be forwarded?
    if(!this.hostNode.isDesignated || isNotRoot) {
      this.hostNode.forwardMessage(this.remoteNode.id, msg.copyWithIncrement());
    }
  }
}

class BridgeNode extends Node {
  constructor(id) {
    super(id)
    // connections represent the ports that are configured in the network
    this.connections = new Map();

    // based on messages
    this.rootId = id;
    this.distanceFromRoot = 0;
    // Each node assumes that they are the root in the beginning

    // When designated, the node's broadcasts are necessary.
    this.isDesignated = true;
    this.isRoot = true;
  }

  getConnections() {
      return [...this.connections.values()];
  }

  addConnection(edge) {
    let isNodeA = edge.nodeA.id == this.id;
    let remoteNode = isNodeA ? edge.nodeB : edge.nodeA;
    this.connections.set(remoteNode.id, new Connection(this.id, edge));
  }

  receiveMessage(msg) {
    // An incoming message has a fromPort, root, and dist
    // fromId is used to locate the connection
    // The message is passed to that connection for analysis
    this.connections.get(msg.fromId).receive(msg);
  }

  forwardMessage(comingFrom, msg) {
    this.getConnections()
    .filter(c => c.remoteNode.id != comingFrom) // Forward to other connections
    .filter(c => c.isBetterMessage(msg))
    .forEach(connection => {
      console.log(`Forwarding (from,to) (${this.id},${connection.remoteNode.id}), orig from ${comingFrom}: ${msg}`)
      connection.send(msg.copy())
    })
  }

  sendMessage(connection, msg) {
    connection.send(msg);
  }

  createMessage() {
      return new Message(this.id, this.rootId, this.distanceFromRoot);
  }

  sendConfigurationMessages() {
    if(this.isDesignated) {
      let msg = this.createMessage();
      console.log(`Broadcasting ${msg}`);
      var self = this;
      this.getConnections()
      //.filter(c => c.isBetterMessage(msg))
      .forEach(connection => {
        self.sendMessage(connection, msg)
      });
    }
  }

  init() {
    let self = this;
    var toClear = setInterval(function () {
      self.sendConfigurationMessages();

      if (!self.isDesignated) {
        clearInterval(toClear)
      }
    }, 1000);

    setTimeout(function(){
        // stop after 10 seconds for now
        self.isDesignated = false;
    }, 10000);
  }
}

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
    this.edgeList.forEach(([src, nodeAPort, dst, nodeBPort]) => this.graph.edges.set(getEdgeKey(src,dst), new BridgeEdge(this.getNode(src), nodeAPort, this.getNode(dst), nodeBPort)));

    // Use edges to configure each node with it's connections
    [...this.graph.nodes.values()].forEach(node => {
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
  getEdgesForNode(node) {
    return [...this.graph.edges.values()].filter(x => x.nodeA.id == node.id || x.nodeB.id == node.id);
  }
  runSimulation() {
      // Init each node so that it starts sending messages
      [...this.graph.nodes.values()].forEach(node => {
          node.init();
      });
  }
}

let edgelist = [
  [1,1,  2,1],
  [1,2,  3,1]
];

let edgelist2 = [
  [1,1,  2,1],
  [1,2,  4,1],
  [1,3,  6,1],
  [1,4,  7,1],
  [2,2,  3,1],
  [3,2,  5,1],
  [5,2,  7,2],
  [1,5,  5,3]
]

let showEdges = false;
let network = new Network(edgelist2);
var n1 = network.getNode(1);
var n2 = network.getNode(2);
var n3 = network.getNode(3);

// Print the edges for the network
if(showEdges)
    [...network.graph.nodes.values()].forEach(x => console.log(network.getEdgesForNode(x)));

// Simulate one round of messaging
network.getNode(4).sendConfigurationMessages();
