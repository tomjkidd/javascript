// Bridges have ports
// Bridges are connected together through ports
// Bridges pass messages to eachother
// Bridge -> Port -> Message -> Port -> Bridge
// Messages are analyzed to determine the root of the network
// Message: fromId, rootId, distanceFromRoot
// Each port needs to keep track of the best message it has seen (received or transmitted)
// Each bridge initially thinks it is the root, message { fromId: id, rootId: id, distanceFromRoot: 0 }

// Use case: Message arrives on a port
// Determine if this new message is better:
// Better: message.rootId is smaller than current best
//      || message.rootId is equal to current best but message.distanceFromRoot is less
//      || message.rootId and message.distanceFromRoot are same, but message.fromId has a smaller id than the current best
// If incoming message is better, bridge discards the old info and saves the new, after adding 1 to the distanceFromRoot field to account for the transmission being received.

// If a message comes from a Bridge with a smaller id, the receiver should stop generating its own configuration messages.
// After this, the Bridge should only forward messages, again adding 1 to the distanceFromRoot to account for the hop

// Each port can receive a message that makes it clear that it is not the designated Bridge
// Not Designated: message.distanceFromRoot < best.distanceFromRoot
//                || message.distanceFromRoot == best.distanceFromRoot, but message.fromId < bridge.id
// When Not Designated, configuration messages over that port are stopped
// For each Bridge, they should only broadcast messages over ports for which they are the Designated Bridge.
