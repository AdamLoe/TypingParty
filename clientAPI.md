# Client Messages
| socketType | description |
| ---------- | :---------- |
| **playerGameUpdate** | finished typing word|
| **profileUpdate**| updated name/icon|
| **leaveGame** | return to menu / closed browser |
| **joinGame** | clicked join |
| **createGame** | create game menu submit |
| **getBrowser**| open server browser or change filters|
| **sendMessage** | messager submit |
| **getPacket** | missed major packet version |
| **getGameObject** | game failing / missing many packets |


##playerGameUpdate

User should send after typing each word

```
{
    "currChar": 5
}
```

##profileUpdate
User updates name/icon
```
{
  name: "Adam",
  icon: {
    type: "icon1",
    primary: "green",
    secondary: "red"
  }
} 
```

##leaveGame
```
null [no paramters needed]
```
##joinGame
```
{
    gameID: 147,
    password: "blue",
    name: "Adam",
    icon: { ... }
}
```
##createGame
```
{
    options: {
        name: "Adam's Game',
        password: "Blue",
        maxPlayers: 12,
        maxGames: 4,
        scoringType: "Default",
        handicaps: "Off"
    },
    name: "Adam",
    icon: { ... }
}
 ```
##sendMessage
```
"Howdy Yall"
```
##getPacket
```
{
    majorVersion: 3,
    minorVersion: 0
}
```
##getGameObject
No arguments neccesary, server knows what game
## getBrowser
User wants list of games

`Should be moved to REST on lambda server eventually`

`No filters yet`
```json 
{
    
}
```


