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
  status: "LOBBY",
  hasRaceStarted: false,
  playerCount: 7,
  maxPlayers: 16,
  currGame: 3,
  maxGames: 8,
  scoringType: "Rising",
  handicaps: "Auto",
  string: "A wise man ran up the hill. He did not know what to do",
  numChars: string.length,
  timeEnd: 123453 [Date.now()] 
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
    finished: 1,
    timeLeft: 4,
    164: {
        place: false,
        finished: false,
        currChar: 20,
        score: 0,
        readyUp: false
    },
    123: {
        place: 1,
        finished: 100234 [Date.now()],
        currChar: 30,
        score: 10,
        readyUp: false
    }
}