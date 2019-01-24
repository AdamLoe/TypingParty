import { getRandomIcon } from "../components/Other/Icon";

let initState = {
  name: "Guest",
  icon: getRandomIcon()
};
let exampleIcon = {
  type: "icon3",
  primary: "red",
  secondary: "green"
};

export default (state = initState, action) => {
  let { type, name, icon } = action;
  switch (type) {
    case "updateProfile":
      return {
        ...state,
        shouldShowProfile: false,
        name,
        icon
      };
    default:
      return state;
  }
};
