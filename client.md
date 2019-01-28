#Client


##Modules
**RaceView**:
Shows Progress & WPM  
**TypingController**:
Handles Typing 
**Leaderboard**:
Shows Scores  
**Messager**: 
Lobby Chat Room  
**ProfileEditor**:
Player can update Name / Icon

**GameBrowser**: 
Shows list of games  
**GameCreator**:
Creator with multiple options

**RaceEditor**:
Host can edit game in lobby  
**LobbyController**:
ReadyUp/Leave (Eventually players 
will be able to do more here)

###Lobby
Upon game creation or race ending,
game is set to lobby mode  
This game will stay in lobby mode until a
certain percentage of users ready up  
RaceView shows which users are readied up
TypingController is replaced by lobby controller 

###Race
Upon game start, 

**RACE** 

Lobby  
```
Both
    Leaderboard
        Display Score from Server
    Messager
    RaceView
        Display race data from server
    ProfileEditor
Lobby
    LobbyController
Race
    TypingController
    
Lobby
    We still want raceview because race view show a list of players
    But, I feel like it's a really bad idea to do that, because raceview should be very basic
    On the other hand, I would have to have another list of players
    On Raceview, you could have a green button to the left of the player
    LobbyController
        -Has Ready Up, Leave Game
        -Eventually has voting
        -Voting would need to have data from the server
        -Which would be fine
        -Host should have force start
        
Race
    How to handle PreRace, PostRace
    State should probably just be "LOBBY or RACE"
       because that's all that changes bigly
    Should have variable hasRaceStarted
        onRaceStart, TypingController unlocks
    On Race End, we can just go straight to lobby
        We can have an information button on the raceView, that the user can 
        click, as long as the next race hasn't started yet
    
```
    
Race