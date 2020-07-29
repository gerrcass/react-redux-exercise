import { v4 } from "uuid";
import * as api from "../api";
import { getIsFetching } from "../reducers";

const requestTodos = (filter) => ({
  type: "REQUEST_TODOS",
  filter,
});

const receiveTodos = (filter, response) => ({
  type: "RECEIVE_TODOS",
  filter,
  response,
});

export const fetchTodos = (filter) => (dispatch, getState) => {
  if (getIsFetching(getState(), filter)) {
    /* return a Promise for the convenience of the calling code
    so that .then() can be used in the component (keeping the
    same return type as bellow) */
    return Promise.resolve();
  }
  dispatch(requestTodos(filter));

  //return a Promise
  return api.fetchTodos(filter).then((response) => {
    dispatch(receiveTodos(filter, response));
  });
};

export const addTodo = (text) => ({
  type: "ADD_TODO",
  id: v4(),
  text,
});

export const toggleTodo = (id) => ({ type: "TOGGLE_TODO", id });
