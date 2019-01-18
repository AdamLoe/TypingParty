let getRandomColor = () => {
  let red = Math.random() * 255;
  let green = Math.random() * 255;
  let blue = Math.random() * 255;
  return "rgba(" + red + "," + green + "," + blue + ", 1)";
};

module.exports = (id, players) => {
  console.log("New Player Joined", id);

  players[id] = {
    x: 300,
    y: 300,
    color: getRandomColor()
  };
};
