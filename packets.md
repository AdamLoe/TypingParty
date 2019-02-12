#Packets Explained
###Data Storage
```
{ 
    [game.id]: {
    majorVersion: 5,
    minorVersion: 1,
    shouldNewMajorVersion: false,
    pendingPackets: [
    ],
    [majorVersion]: {
        [minorVersion]: {
            info: { ... }
        }
    }
}
```
###Explained
**EditGame**: Adds updated Obj information to pendingPackets,
don't actually edit the game  
**FlushPackets**: Combines packets, gets new version, updates
packet object, and applies it to game object    
**newVersion**: Doesn't change major is version if no one finished and
only the timeLeft was updated  
**setNextPacketMajor**: Next packet is forced major  
 **getMissingPacket**: Get requested packet  