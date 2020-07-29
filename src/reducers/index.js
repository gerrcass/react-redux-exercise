/* const combineReducers = (reducers) => {
  return (state = {}, action) => {
    return Object.keys(reducers).reduce((nextState, key) => {
      nextState[key] = reducers[key](state[key], action);
      return nextState;
    }, {});
  };
}; */
import { combineReducers } from "redux";
import byId, * as fromById from "./byId";
import createList, * as fromList from "./createList";

const listByFilter = combineReducers({
  all: createList("all"),
  active: createList("active"),
  completed: createList("completed"),
});

const todos = combineReducers({ byId, listByFilter });

export default todos;
// The default export is always the reducer function, but any named export starting with get is a so called SELECTOR,
// that is to say a function that prepares the data to be displayed by the UI.

export const getVisibleTodos = (state, filter) => {
  const ids = fromList.getIds(state.listByFilter[filter]);
  return ids.map((id) => fromById.getTodo(state.byId, id));
};

export const getIsFetching = (state, filter) => {
  return fromList.getIsFetching(state.listByFilter[filter]);
};
