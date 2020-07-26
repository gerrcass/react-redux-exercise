import { createStore } from "redux";
import todoApp from "./reducers";

const addLoggingToDispatch = (store) => {
  const rawDispatch = store.dispatch;
  if (!console.group) {
    return rawDispatch;
  }

  return (action) => {
    console.group(action.type);
    console.log("%c prev state", "color:gray", store.getState());
    console.log("%c action", "color:blue", action);
    const returnValue = rawDispatch(action);
    console.log("%c next state", "color:green", store.getState());
    console.groupEnd();
    return returnValue;
  };
};

// thunk alike middleware
const addPromiseSupportToDispatch = (store) => {
  const rawDispatch = store.dispatch;
  return (action) => {
    if (typeof action.then === "function") {
      return action.then(rawDispatch);
      //acition.then(rawDispatch) === action.then(actionObject => rawDispatch(actionObject))
    }
    return rawDispatch;
    // rawDispatch === rawDispatch(action)
  };
};

const configureStore = () => {
  const store = createStore(todoApp);

  if (process.env.NODE_ENV !== "production") {
    store.dispatch = addLoggingToDispatch(store);
  }

  store.dispatch = addPromiseSupportToDispatch(store);

  return store;
};

export default configureStore;
