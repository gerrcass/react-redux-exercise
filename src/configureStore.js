import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import todoApp from "./reducers";

/* a basic and working implementation of a thunk middleware
(redux-package do a better job)
const thunk = (store) => (next) => (action) => {
  typeof action === "function"
    ? action(store.dispatch, store.getState)
    : next(action);
}; */

const configureStore = () => {
  const middlewares = [thunk];
  if (process.env.NODE_ENV !== "production") {
    middlewares.push(createLogger());
  }

  return createStore(
    todoApp,
    //persistedState, //for something like localStorage
    applyMiddleware(...middlewares)
  );
};

export default configureStore;
