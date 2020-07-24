import { combineReducers } from "redux";

// getting all the named exports in 'fromTodos' (these are basically to encasulate selectors down bellow)
import todos, * as fromTodos from "./todos";

const todoApp = combineReducers({
  todos,
});

export default todoApp;

// all function selectors start with "get" by convention

// this pattern avoid the compoonents to rely on the state shape. Here we encapsulate the selector
// and manipulate it so that the final reducer get the state in the form that it expected (a little
// bit of separation of concerns)
export const getVisibleTodos = (state, filter) =>
  fromTodos.getVisibleTodos(state.todos, filter);
