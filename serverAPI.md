#Server Messages

| socketType | description |
| ---------- | :---------- |
| **updateGameData** | updates between game ticks|
| **updateMissingPacket**| send client missing packets|
| **updateGameObject** | send whole game object |
| **updateBrowserData** | send list of games |
| **newMessage** | send message to whole game |
| **error** | error message

##updateGameData
Server sends this out every game tick
```
{
  "majorVersion": 3,
  "minor": 1,
  "packet": {
     "gameData": {
        "timeLeft": 34,
        134: {
          "finished": 4,
          "wpm": 87
        }
     }
  }
}
```
##updateMissingPacket
When a user asks for missing packet
```
{
    "majorVersion": 3,
    "minorVersion": 0,
    "packet": {
        players: {
            134: {
                name: "Johnny",
                icon: {...}
            }
        }
    }
}
```
## updateGameObject 
When a player joins, or hits error

```json 
{
    "majorVersion": 5,
    "minorVersion": 3,
    "game"; {
        id,
        info: {...},
        players: {...},
        gameData: {...},
        leaderboard: {...}
        /* See gameObject.md */
    }
}
```

## updateBrowserData
When players ask for server list

`Need to add filters`

`Should be moved to REST on lambda server eventually`

```
[
  {
    "id": 123,
    "name": "Adam's Server",
    "status": "LOBBY",
    "maxPlayers": 16,
    "playerCount": 12,
    "maxGames": 8,
    "currGame": 3,
    "scoringType": "Default",
    "handicaps": "Off"
  },
  "... More Game Objects"
]
```

##newMessage 
```
{
    id: [playerID],
    text: "Howdy",
    time: [Date.time()]
}
```