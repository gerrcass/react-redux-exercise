import { createStore } from "redux";
import throttle from "lodash/throttle"; // only import throttle() from the entire lodash library
import todoApp from "./reducers";
import { loadState, saveState } from "./localStorage";

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

const configureStore = () => {
  const persistedState = loadState();

  /* starting the Redux store with a previously persisted state passed as a second argument to the createStore()
  notice how the localStorage only store "todos" when saveState() is called (never "visibilityFilter"). This results 
   in the Redux object state setting up the initial state accordingly to its specific reducer. */
  const store = createStore(todoApp, persistedState);

  if (process.env.NODE_ENV !== "production") {
    store.dispatch = addLoggingToDispatch(store);
  }

  /* Any change in the store run saveState() but no more than one time per second for performance reasons. 
  lodash throttle() invokes func at most once per every wait milliseconds: _.throttle(func, [wait=0], [options={}])
  this is to avoid calling saveState() too often because it uses the expansive stringify operation. */
  store.subscribe(
    throttle(() => {
      saveState({
        todos: store.getState().todos,
      });
    }, 1000)
  );

  return store;
};

export default configureStore;
