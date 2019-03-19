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
  history: {...},
  banList: {...},
}
```

##info
```
{
  name: "Adam's Ga
  me",
  password: "blue",
  host: 12532 [playerID],
  created: [Date.now()],
  
   //Descending Scaling WinnerTakesAll
  scoringType: "Descending",
   //Off Score WPM Manual
  handicaps: "Off",
    
   //KnockOut Timed Paragraph Breakaway
  gameMode: "KnockOut",
  timerEnabled: true, 
  
  
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
  
  lastActive: [Date.now()]
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
        
        score: 0,
        handicap: 0,
        
        charsTyped: 16,
        progress: 20,
        wpm: 54,
        
        avgWPM: 62,
        gamesPlayed: 2,
        
        readyUp: false,
        isActive: true,
        inGame: true,
    },
    123: {
        place: 1,
        finished: 100234 [Date.now()],
        currChar: 30,
        score: 10,
        readyUp: false,
        isActive: true,
        inGame: false
    }
}
```
##history
``` 
{
    currTourney: 1,
    [tourneyIndex]: {
        tourneyStart: "1:03 PM"
        races: 1,
        [raceIndex]: {
            raceStart: "1:04 PM",
            gameMode: "Knock Out",
            players: {
                [playerID]: {
                    score: 80,
                    wpm: 34,
                    stat: "33 Words",
                    place: 1,
                }
            }
        }
        (Total Score && Average WPM)
        overview: {
            players: {
                [playerID]: {
                    score: 80,
                    wpm: 34,
                    stat: "33 Words",
                    place: 1,
                }
            }
        }
    }
}
``` 