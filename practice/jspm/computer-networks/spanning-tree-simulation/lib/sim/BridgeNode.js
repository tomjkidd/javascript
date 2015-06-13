'use strict';
import { Node } from 'lib/graph/Node'
import { Connection } from 'lib/sim/Connection'
import { Message } from 'lib/sim/Message'

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

export { BridgeNode }
