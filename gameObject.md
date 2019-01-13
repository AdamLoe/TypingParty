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
  leaderboard: {...},
  banList: {...}
}
```

##info
```
{
  name: "Adam's Game",
  password: "blue",
  host: 12532 [playerID],
  status: "LOBBY",
  playerCount: 7,
  maxPlayers: 16,
  currGame: 3,
  maxGames: 8,
  scoringType: "Rising",
  handicaps: "Auto",
  string: "A wise man ran up the hill. He did not know what to do",
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
    164: {
        finished: false,
        wpm: 83,
        currWord: 23,
        progress: 80.3 [percentage],
        score: 0,
    },
    123: {
        finished: 1,
        wpm: 103,
        currWord: 30,
        progress: 100,
        score: 10
    }
}