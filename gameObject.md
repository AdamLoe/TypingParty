# Game Object

6 Main Keys

**ID**: game identifier

**Info**: name, password, status, game details etc.

**Player**: player names, & profile details

**gameData**: progress, finish #, WPM, leaderboard score

**banList**: Stores IDs/IPs of banneds, currently not shared with users

##Overview
```
{
  id: 123,
  info: {...},
  players: {...},
  gameData: {...},
  banList: {...},
}
```

##info
```
{
  name: "Adam's Game",
  password: "blue",
  host: 12532 [playerID],
  created: [Date.now()],
  
  scoringType: "Rising",
  handicaps: "Auto",
  
  status: "LOBBY",
  string: "A wise man went...",
  numChars: string.length,
  
  playerCount: 7,
  maxPlayers: 16,
  
  currGame: 3,
  maxGames: 8,
 
  hasRaceStarted: false,
  numFinished: 0,
  activePlayers: 0,
  
  timeStart: [Date.now()]
  timeEnd: 123453 [Date.now()+45*1000],
  timeLeft: 5 [seconds]
}
```

##players
```
{
    164: {
        "name": "Adam",
        "icon": {
            "type": "icon1",
            "primary": "green",
            "secondary": "red"
        {
    },
    ...MorePlayers
}
```
##gameData
``` 
{
    164: {
        place: false,
        finished: false,
        currChar: 20,
        score: 0,
        readyUp: false,
        isActive: true
    },
    123: {
        place: 1,
        finished: 100234 [Date.now()],
        currChar: 30,
        score: 10,
        readyUp: false,
        isActive: true
    }
}