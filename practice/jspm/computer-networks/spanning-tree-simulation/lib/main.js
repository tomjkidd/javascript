import { Network } from 'lib/sim/Network'

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
];

let showEdges = false;
let network = new Network(edgelist2);
var n1 = network.getNode(1);
var n2 = network.getNode(2);
var n3 = network.getNode(3);

// Print the edges for the network
if(showEdges)
    network.getNodes().forEach(x => console.log(network.getEdgesForNode(x)));

// Simulate one round of messaging
network.getNode(2).sendConfigurationMessages();
