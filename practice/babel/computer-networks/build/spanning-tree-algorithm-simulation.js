define(["exports"], function (exports) {
  "use strict";

  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _slicedToArray(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }

  function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function getEdgeKey(nodeAId, nodeBId) {
    return "" + nodeAId + "," + nodeBId;
  }

  var Graph = function Graph() {
    _classCallCheck(this, Graph);

    this.nodes = new Map();
    this.edges = new Map();
  };

  var Node = function Node(id) {
    _classCallCheck(this, Node);

    this.id = id;
  };

  var Edge = (function () {
    function Edge(nodeA, nodeB) {
      _classCallCheck(this, Edge);

      this.nodeA = nodeA;
      this.nodeB = nodeB;
    }

    _createClass(Edge, [{
      key: "toString",
      value: function toString() {
        return "(" + this.nodeA.id + "," + this.nodeB.id + ")";
      }
    }]);

    return Edge;
  })();

  var BridgeEdge = (function (_Edge) {
    function BridgeEdge(nodeA, nodeAPort, nodeB, nodeBPort) {
      _classCallCheck(this, BridgeEdge);

      _get(Object.getPrototypeOf(BridgeEdge.prototype), "constructor", this).call(this, nodeA, nodeB);
      this.nodeAPort = nodeAPort;
      this.nodeBPort = nodeBPort;
    }

    _inherits(BridgeEdge, _Edge);

    _createClass(BridgeEdge, [{
      key: "toString",
      value: function toString() {
        return "{src: (" + this.nodeA.id + ", P" + this.nodeAPort + ") dst: (" + this.nodeB.id + ", P" + this.nodeBPort + ")}";
      }
    }]);

    return BridgeEdge;
  })(Edge);

  /* Used to communicate from host to host */

  var Message = (function () {
    function Message(from, root, d) {
      _classCallCheck(this, Message);

      /* Id of the bridge sending the message */
      this.fromId = from;
      /* Id of what the sending bridge believes is the root */
      this.rootId = root;
      /* What sending bridge believes is the distance from the root */
      this.distanceFromRoot = d;
    }

    _createClass(Message, [{
      key: "toString",
      value: function toString() {
        return "Message from Node " + this.fromId + ": Root = " + this.rootId + " Distance = " + this.distanceFromRoot;
      }
    }, {
      key: "copyWithIncrement",
      value: function copyWithIncrement() {
        return new Message(this.fromId, this.rootId, this.distanceFromRoot + 1);
      }
    }, {
      key: "copy",
      value: function copy() {
        return new Message(this.fromId, this.rootId, this.distanceFromRoot);
      }
    }]);

    return Message;
  })();

  var Connection = (function () {
    function Connection(hostId, edge) {
      _classCallCheck(this, Connection);

      // In this project, each link creates two Connections
      // Each connection is one way
      var isNodeA = edge.nodeA.id == hostId;
      var hostNode = isNodeA ? edge.nodeA : edge.nodeB;
      var hostPort = isNodeA ? edge.nodeAPort : edge.nodeBPort;
      var remoteNode = isNodeA ? edge.nodeB : edge.nodeA;
      var remotePort = isNodeA ? edge.nodeBPort : edge.nodeAPort;

      this.hostNode = hostNode;
      this.hostPort = hostPort;
      this.remoteNode = remoteNode;
      this.remotePort = remotePort;
      // Initially the best message is the host's own message with default settings
      this.bestMessage = hostNode.createMessage();
    }

    _createClass(Connection, [{
      key: "toString",
      value: function toString() {
        return "Host " + this.hostNode.id + ", Remote " + this.remoteNode.id;
      }
    }, {
      key: "isBetterMessage",
      value: function isBetterMessage(msg) {
        var idSmallerThanBest = msg.rootId < this.bestMessage.rootId;
        var idSameButDistanceSmallerThanBest = msg.rootId == this.bestMessage.rootId && msg.distanceFromRoot < this.bestMessage.distanceFromRoot;
        var idAndDistanceSameButFromIdSmallerThanBest = msg.rootId == this.bestMessage.rootId && msg.distanceFromRoot == this.bestMessage.distanceFromRoot && msg.fromId < this.bestMessage.rootId;

        if (idSmallerThanBest || idSameButDistanceSmallerThanBest || idAndDistanceSameButFromIdSmallerThanBest) {
          return true;
        } else {
          return false;
        }
      }
    }, {
      key: "isNotDesignated",
      value: function isNotDesignated(msg) {
        var fromDistanceLessThanBest = msg.distanceFromRoot < this.bestMessage.distanceFromRoot;
        var sameDistanceButFromIdSmaller = msg.distanceFromRoot == this.bestMessage.distanceFromRoot && msg.fromId < this.hostNode.id;

        return fromDistanceLessThanBest || sameDistanceButFromIdSmaller;
      }
    }, {
      key: "send",
      value: function send(msg) {
        // When sending a message, use the bridge's id
        msg.fromId = this.hostNode.id;
        this.remoteNode.receiveMessage(msg);
      }
    }, {
      key: "receive",
      value: function receive(msg) {
        console.log("Host Node " + this.hostNode.id + " received : " + msg + " from Remote Node " + this.remoteNode.id);
        var isNotDesignated = this.isNotDesignated(msg);
        var isBetterMessage = this.isBetterMessage(msg);
        var isNotRoot = !this.hostNode.isRoot || msg.rootId < this.hostNode.rootId;

        // Is this a best message?
        if (isBetterMessage) {
          this.bestMessage = msg.copyWithIncrement();
          console.log("Best Message for Host" + this.hostNode.id + " P" + this.hostPort + ": " + msg);
        }

        // Analyze message for root/designation effects
        if (isNotRoot) {
          console.log("Host " + this.hostNode.id + " is no longer considered a root");
          this.hostNode.isRoot = false;
        }
        if (isNotDesignated) {
          console.log("Host " + this.hostNode.id + " is no longer designated");
          this.hostNode.isDesignated = false;
        }

        // Does the message need to be forwarded?
        if (!this.hostNode.isDesignated || isNotRoot) {
          this.hostNode.forwardMessage(this.remoteNode.id, msg.copyWithIncrement());
        }
      }
    }]);

    return Connection;
  })();

  var BridgeNode = (function (_Node) {
    function BridgeNode(id) {
      _classCallCheck(this, BridgeNode);

      _get(Object.getPrototypeOf(BridgeNode.prototype), "constructor", this).call(this, id);
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

    _inherits(BridgeNode, _Node);

    _createClass(BridgeNode, [{
      key: "getConnections",
      value: function getConnections() {
        return [].concat(_toConsumableArray(this.connections.values()));
      }
    }, {
      key: "addConnection",
      value: function addConnection(edge) {
        var isNodeA = edge.nodeA.id == this.id;
        var remoteNode = isNodeA ? edge.nodeB : edge.nodeA;
        this.connections.set(remoteNode.id, new Connection(this.id, edge));
      }
    }, {
      key: "receiveMessage",
      value: function receiveMessage(msg) {
        // An incoming message has a fromPort, root, and dist
        // fromId is used to locate the connection
        // The message is passed to that connection for analysis
        this.connections.get(msg.fromId).receive(msg);
      }
    }, {
      key: "forwardMessage",
      value: function forwardMessage(comingFrom, msg) {
        var _this = this;

        this.getConnections().filter(function (c) {
          return c.remoteNode.id != comingFrom;
        }) // Forward to other connections
        .filter(function (c) {
          return c.isBetterMessage(msg);
        }).forEach(function (connection) {
          console.log("Forwarding (from,to) (" + _this.id + "," + connection.remoteNode.id + "), orig from " + comingFrom + ": " + msg);
          connection.send(msg.copy());
        });
      }
    }, {
      key: "sendMessage",
      value: function sendMessage(connection, msg) {
        connection.send(msg);
      }
    }, {
      key: "createMessage",
      value: function createMessage() {
        return new Message(this.id, this.rootId, this.distanceFromRoot);
      }
    }, {
      key: "sendConfigurationMessages",
      value: function sendConfigurationMessages() {
        var _this2 = this;

        if (this.isDesignated) {
          var self;

          (function () {
            var msg = _this2.createMessage();
            console.log("Broadcasting " + msg);
            self = _this2;

            _this2.getConnections()
            //.filter(c => c.isBetterMessage(msg))
            .forEach(function (connection) {
              self.sendMessage(connection, msg);
            });
          })();
        }
      }
    }, {
      key: "init",
      value: function init() {
        var self = this;
        var toClear = setInterval(function () {
          self.sendConfigurationMessages();

          if (!self.isDesignated) {
            clearInterval(toClear);
          }
        }, 1000);

        setTimeout(function () {
          // stop after 10 seconds for now
          self.isDesignated = false;
        }, 10000);
      }
    }]);

    return BridgeNode;
  })(Node);

  var Network = (function () {
    function Network(edgelist) {
      _classCallCheck(this, Network);

      this.graph = new Graph();
      this.nodeList = this.getNodeList(edgelist);
      /* Each edge specifies nodeAId, nodeAPort, nodeBId, nodeBPort. There is no validation! */
      this.edgeList = edgelist;
      this.init();
    }

    _createClass(Network, [{
      key: "init",
      value: function init() {
        var _this3 = this;

        // Create nodes in the network
        this.nodeList.forEach(function (id) {
          return _this3.graph.nodes.set(id, new BridgeNode(id));
        });

        // Create edges in the network
        this.edgeList.forEach(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 4);

          var src = _ref2[0];
          var nodeAPort = _ref2[1];
          var dst = _ref2[2];
          var nodeBPort = _ref2[3];
          return _this3.graph.edges.set(getEdgeKey(src, dst), new BridgeEdge(_this3.getNode(src), nodeAPort, _this3.getNode(dst), nodeBPort));
        });

        // Use edges to configure each node with it's connections
        [].concat(_toConsumableArray(this.graph.nodes.values())).forEach(function (node) {
          _this3.getEdgesForNode(node).forEach(function (edge) {
            node.addConnection(edge);
          });
        });
        // The nodes in the network are now configured
      }
    }, {
      key: "getNodeList",
      value: function getNodeList(edgelist) {
        var nodelist = [];
        edgelist.forEach(function (_ref3) {
          var _ref32 = _slicedToArray(_ref3, 4);

          var nodeA = _ref32[0];
          var portA = _ref32[1];
          var nodeB = _ref32[2];
          var portB = _ref32[3];

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
    }, {
      key: "getNode",
      value: function getNode(id) {
        return this.graph.nodes.get(id);
      }
    }, {
      key: "getEdgesForNode",
      value: function getEdgesForNode(node) {
        return [].concat(_toConsumableArray(this.graph.edges.values())).filter(function (x) {
          return x.nodeA.id == node.id || x.nodeB.id == node.id;
        });
      }
    }, {
      key: "runSimulation",
      value: function runSimulation() {
        // Init each node so that it starts sending messages
        [].concat(_toConsumableArray(this.graph.nodes.values())).forEach(function (node) {
          node.init();
        });
      }
    }]);

    return Network;
  })();

  var edgelist = [[1, 1, 2, 1], [1, 2, 3, 1]];

  var edgelist2 = [[1, 1, 2, 1], [1, 2, 4, 1], [1, 3, 6, 1], [1, 4, 7, 1], [2, 2, 3, 1], [3, 2, 5, 1], [5, 2, 7, 2], [1, 5, 5, 3]];

  var showEdges = false;
  var network = new Network(edgelist2);
  var n1 = network.getNode(1);
  var n2 = network.getNode(2);
  var n3 = network.getNode(3);

  // Print the edges for the network
  if (showEdges) [].concat(_toConsumableArray(network.graph.nodes.values())).forEach(function (x) {
    return console.log(network.getEdgesForNode(x));
  });

  // Simulate one round of messaging
  network.getNode(2).sendConfigurationMessages();
});
