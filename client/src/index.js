import React from "react";
import { render } from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";

import App from "./containers/App";

import rootReducer from "./reducers";

import thunk from "redux-thunk";
import { createLogger } from "redux-logger";

const middleware = [thunk];
if (process.env.NODE_ENV !== "production") {
  middleware.push(
    createLogger({
      predicate: (getState, action) => {
        switch (action.type) {
          case "updateCreator":
            return false;
          case "updateGameData":
            return true;
          default:
            return true;
        }
      }
    })
  );
}

let store = createStore(rootReducer, applyMiddleware(...middleware));

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

import "./scss/index.scss";
