let initialState = {
  name: "",
  password: "",
  maxPlayers: 8,
  maxGames: 4,
  scoringType: "Default",
  handicaps: "Auto"
};

export default (state = initialState, action) => {
  let { type, name, value } = action;
  switch (type) {
    case "updateCreator":
      console.log("reducer", type, value);
      return {
        ...state,
        [name]: value
      };
    default:
      return state;
  }
};
