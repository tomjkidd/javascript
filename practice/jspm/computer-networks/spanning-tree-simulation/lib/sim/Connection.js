'use strict';

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

export { Connection }
