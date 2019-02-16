import React from "react";
import { connect } from "react-redux";
import PT from "prop-types";

import Icon from "../../components/Profile/Icon";

let AwardRacer = ({ name, icon, place, wpm, stat }) => (
  <div className="RacerAward">
    {name + ":" + place + ":" + stat + ":" + wpm}
  </div>
);

let EndRacePopup = ({ first, second, third, isTourneyOver }) => (
  <div className="EndRacePopup">
    <AwardRacer {...first} />
    {second && <AwardRacer {...second} />}
    {third && <AwardRacer {...third} />}
  </div>
);
let raceItem = PT.oneOf(
  PT.null,
  PT.shape({
    name: PT.string.isRequired,
    icon: PT.object.isRequired,
    place: PT.number.isRequired,
    wpm: PT.number.isRequired,
    stat: PT.string.isRequired
  })
).isRequired;
EndRacePopup.propTypes = {
  first: raceItem,
  second: raceItem,
  third: raceItem,
  isTourneyOver: PT.bool.isRequired
};

let getSortedPlayers = (gameData, isTourneyOver) => {
  let players;
  if (isTourneyOver) {
    players = Object.keys(gameData).map(playerID => ({
      id: playerID,
      stat: null
    }));
  } else {
    players = Object.keys(gameData).map(playerID => ({
      id: playerID
    }));
  }
  return players;
};
let mapState = (state, { isTourneyOver }) => {
  let { gameData, players } = state.game;

  let playerList = getSortedPlayers(gameData, isTourneyOver);

  let awardIDList = playerList.slice(0, 3);
  let awardArr = awardIDList.map(({ id: playerID, stat }) => {
    return {
      name: players[playerID].name,
      icon: players[playerID].icon,
      place: gameData[playerID].place,
      wpm: gameData[playerID].wpm,
      stat
    };
  });

  return {
    first: awardArr[0] || null,
    second: awardArr[1] || null,
    third: awardArr[2] || null
  };
};

export default connect(
  mapState,
  {}
)(EndRacePopup);
