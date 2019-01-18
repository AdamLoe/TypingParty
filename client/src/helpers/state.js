import { Map } from "immutable";
let state = Map({
  status: "MENU",
  finished: false
});

export let getState = () => {
  return state;
};

export let setState = setter => {
  state = setter(state);
};
