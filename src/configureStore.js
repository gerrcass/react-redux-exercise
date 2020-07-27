import { createStore } from "redux";
import todoApp from "./reducers";

const logger = (store) => (next) => {
  if (!console.group) {
    return next;
  }

  return (action) => {
    console.group(action.type);
    console.log("%c prev state", "color:gray", store.getState());
    console.log("%c action", "color:blue", action);
    const returnValue = next(action);
    console.log("%c next state", "color:green", store.getState());
    console.groupEnd();
    return returnValue;
  };
};

// thunk alike middleware
const promise = (store) => (next) => (action) => {
  if (typeof action.then === "function") {
    return action.then(next);
    //acition.then(next) === action.then(actionObject => next(actionObject))
  }
  return next(action);
};

const wrapDispatchWithMiddlewares = (store, middlewares) => {
  middlewares
    .slice()
    .reverse()
    .forEach(
      (middleware) => (store.dispatch = middleware(store)(store.dispatch))
    );
};
const configureStore = () => {
  const store = createStore(todoApp);
  const middlewares = [promise];
  if (process.env.NODE_ENV !== "production") {
    middlewares.push(logger);
  }

  wrapDispatchWithMiddlewares(store, middlewares);

  return store;
};

export default configureStore;
