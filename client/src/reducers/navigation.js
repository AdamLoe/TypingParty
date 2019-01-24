let initialState = {
  showGame: false,
  showMenu: true,
  showBrowser: false,
  showCreator: false,
  showProfile: false
};

export default (state = initialState, action) => {
  let { type } = action;
  switch (type) {
    case "gotoMenu":
      return {
        ...state,
        showGame: false,
        showMenu: true,
        showBrowser: false,
        showCreator: false
      };
    case "updateGameObject":
      return {
        ...state,
        showGame: true,
        showMenu: false
      };
    case "gotoBrowser":
      return {
        ...state,
        showBrowser: true,
        showCreator: false
      };
    case "gotoCreator":
      return {
        ...state,
        showCreator: true,
        showBrowser: false
      };
    case "toggleProfile":
    case "updateProfile":
      return {
        ...state,
        showProfile: !state.showProfile
      };
  }
  return state;
};
