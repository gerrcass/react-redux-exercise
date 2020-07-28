import { combineReducers } from "redux";

/* const combineReducers = (reducers) => {
  return (state = {}, action) => {
    return Object.keys(reducers).reduce((nextState, key) => {
      nextState[key] = reducers[key](state[key], action);
      return nextState;
    }, {});
  };
}; */

const byId = (state = {}, action) => {
  switch (action.type) {
    case "RECEIVE_TODOS":
      // since "nextState" is a shallow copy, and while still a limitation, operation bellow it's only one level
      // deep and it doesn't modify any of the original state object (reducer function stays pure). Re-assignments
      // into the loop are actually efficient.
      const nextState = { ...state };
      // Array from the API response get merged into the lookup table managed by byId
      action.response.forEach((todo) => {
        nextState[todo.id] = todo;
      });
      return nextState;

    /* // Even the shallow degree mutation as above can be avoided entirely by using reduce() as follow because even
      // though this implementation starts with 'state' and not a copy, it doesn't matter because each iteration within
      // reduce returns a new state object built by destructuring the previous one and then appending the updated data. 
      return action.response.reduce(
        (currentState, todo) => ({
          ...currentState,
          [todo.id]: todo,
        }),
        state
      ); */
    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  if (action.filter !== "all") {
    return state;
  }
  switch (action.type) {
    case "RECEIVE_TODOS":
      return action.response.map((t) => t.id);
    default:
      return state;
  }
};

const activeIds = (state = [], action) => {
  if (action.filter !== "active") {
    return state;
  }
  switch (action.type) {
    case "RECEIVE_TODOS":
      return action.response.map((t) => t.id);
    default:
      return state;
  }
};

const completedIds = (state = [], action) => {
  if (action.filter !== "completed") {
    return state;
  }
  switch (action.type) {
    case "RECEIVE_TODOS":
      return action.response.map((t) => t.id);
    default:
      return state;
  }
};

const idsByFilter = combineReducers({
  all: allIds,
  active: activeIds,
  completed: completedIds,
});

const todos = combineReducers({ byId, idsByFilter });

export default todos;
// The default export is always the reducer function, but any named export starting with get is a so called SELECTOR,
// that is to say a function that prepares the data to be displayed by the UI.

export const getVisibleTodos = (state, filter) => {
  const ids = state.idsByFilter[filter];
  return ids.map((t) => state.byId[t]);
};
