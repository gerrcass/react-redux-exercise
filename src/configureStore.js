import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import todoApp from "./reducers";

const thunk = (store) => (next) => (action) => {
  typeof action === "function" ? action(store.dispatch) : next(action);
};

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
