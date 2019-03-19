#Game Flow

**Lobby Handler**: Checks if players are readied up, and tallies votes  
**Setup Race**:  Handles Race Setup  
**Start Race**:  Flips raceStarted switch  
**playerUpdate**:  Updates player ready/vote or currChar  
**setProgress**:  Set each players progress based on mode, and update if different  
**checkEnded**:  Checks if specific mode's ending criteria are met    
**scoreSaveRace**:  Updates leaderbaord scores and saves race to history  
**endRace**:  Sets next race num, sends to lobby  
**Word Generator**: Create custom really long string for knockout and breakaway.   
**Race Lines**:  
##LobbyHandler
 Checks if enough people are readied up. 
 ```json

```
##SetupRace 
Resets Game Info, Sets New Time, Sets new Strings 
Sets Game Mode & Initial Mode Progress
```
info: {
    status: "RACE",
    hasRaceStarted: false,
    numFinished: 0,
    
    timeLeft: time,
    timeStart: Date.now(),
    timeEnd: Date.now() + time * 1000,
    
    string,
    numChars: string.length,
    
    gameMode: "Knockout"
}
gameData: {
    [All players]: {
        place: false,
        finished: false,
        currChar: 0,
        readyUp: false,
        progress: 0 (Timed & Paragraph),
        progress: .5 (Breakaway & Knockout)
    };
}
```

##StartRace 
Sets Race Started, and sets Race Time  
```
info: {
    hasRaceStarted: true,
    
    timeLeft: time,
    timeStart: Date.now(),
    timeEnd: Date.now() + time * 1000
    
}
```

##playerUpdate
Sets isReady & readyVote  
or   
Sets currChar 

##setProgress 
Sets Place for all modes based on currChar  
Sets Progress for specific mode from currChar
```
{
    place: 1,
    progress: .75, (75% of way)
}
Paragraph & Timed:
    progress = currChar / maxChars
KnockOut:
    leaderDistance = leaderChar - currChar
    if leaderChar < neededDistance / 2:  (Starts all players halfway point)
        leaderDistance += neededDistance / 2 - leaderChar
    progress = 1 - leaderDistance / neededDistance
Breakaway:
    progress = 
Knockout & Breakaway:
    if (progress < 0) 
        progress = -1 (Player Stopped)
```
 
##checkEnded
Check if gameMode should end
```
Paragraph: isTimeUp or isAllFinished
Timed: isTimeUp
Knockout & Breakaway: isOneLeft   
````

##endRace
``` 
Updates Leaderboard Scores
Saves Race to History
    Save new Race
    Update Race Overview
Increase Race Number  
Sets Mode to Lobby

if tourneyOver
    Reset All Leaderbaord Scores
    Set game# to 0
```
##scoreSaveRace
Calculates points for each player
```
Paragraph:
    Default: 
Timed:

KnockOut:

Breakaway:

```
Saves Race to RaceHistory
```
{
    history: {
        [tourneyNumber]: {
            [raceNum]: {
                time: "1:02 PM",
                gameMode: "Knock Out",
            }
        }
    }
}
```

**Word Generator**:  Creates really long string for Breakaway and Knockout   
**Race Lines**:
