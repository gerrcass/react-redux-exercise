import { combineReducers } from "redux";

/* const combineReducers = (reducers) => {
  return (state = {}, action) => {
    return Object.keys(reducers).reduce((nextState, key) => {
      nextState[key] = reducers[key](state[key], action);
      return nextState;
    }, {});
  };
}; */

import todo from "./todo";

const byId = (state = {}, action) => {
  switch (action.type) {
    case "ADD_TODO":
    case "TOGGLE_TODO":
      return {
        ...state,
        [action.id]: todo(state[action.id], action),
      };
    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, action.id];
    default:
      return state;
  }
};

/* case 'RECEIVE_TODOS':
      const todosTorender= getVisibleTodos(action.todos,action.filter)
      todosTorender.forEach(todo => {[todo.id]: })
      return {
        ...state,
        [todosTorender.id]: ...todosTorender
      } */

const todos = combineReducers({ byId, allIds });

export default todos;
// The default export is always the reducer function, but any named export starting with get is a so called SELECTOR,
// that is to say a function that prepares the data to be displayed by the UI.

/* //function replaced by Object.values() bellow
const getAllTodos = (state) => state.allIds.map((id) => state.byId[id]); */

export const getVisibleTodos = (state, filter) => {
  //const allTodos = getAllTodos(state);
  const allTodos = Object.values(state.byId);

  switch (filter) {
    case "all":
      return allTodos;
    case "completed":
      return allTodos.filter((todo) => todo.completed);
    case "active":
      return allTodos.filter((todo) => !todo.completed);
    default:
      throw new Error(`Unkown filter ${filter}.`);
  }
};
