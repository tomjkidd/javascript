'use strict';

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

export { Message }
