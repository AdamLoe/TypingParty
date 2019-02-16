import React from "react";
import PT from "prop-types";

let CountdownStart = ({ timeLeft }) => <div className="Start">{timeLeft}</div>;
let CountdownFinal = ({ timeLeft }) => <div className="Final"> {timeLeft}</div>;
let CountdownGo = ({ timeLeft }) => <div className="Go">GO!</div>;

let CountdownPopup = ({ timeLeft, hasRaceStarted }) => {
  let show;
  if (timeLeft > 3) show = "Start";
  if (timeLeft <= 3) show = "Final";
  if (timeLeft <= 0 || hasRaceStarted) show = "Go";
  return (
    <div className="Countdown" style={{ opacity: hasRaceStarted ? "0" : "1" }}>
      {show === "Start" && <CountdownStart timeLeft={timeLeft} />}
      {show === "Final" && <CountdownFinal timeLeft={timeLeft} />}
      {show === "Go" && <CountdownGo />}
    </div>
  );
};
CountdownPopup.propTypes = {
  timeLeft: PT.number.isRequired,
  hasRaceStarted: PT.bool.isRequired
};

export default CountdownPopup;
