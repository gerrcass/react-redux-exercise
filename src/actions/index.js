import * as api from "../api";
import { getIsFetching } from "../reducers";

export const fetchTodos = (filter) => (dispatch, getState) => {
  if (getIsFetching(getState(), filter)) {
    /* return a Promise for the convenience of the calling code
    so that .then() can be used in the component (keeping the
    same return type as bellow) */
    return Promise.resolve();
  }
  dispatch({
    type: "FETCH_TODOS_REQUEST",
    filter,
  });

  /* using a callback in the second argument of .then(onfulfilled,onrejected) instead of then().catch()
  This lets catching ONLY the errors from the underlying API promise. Explanation:
  You might have seen a different way of handling promise errors in some examples where only one
  argument is passed and then you call catch on the resulting promise. The downside of this approach
  is if one of your reducers or describe components throws while handling this action you'll get into
  the sketch block and so you'll display an internal error message to the user. */
  return api.fetchTodos(filter).then(
    (response) => {
      dispatch({
        type: "FETCH_TODOS_SUCCESS",
        filter,
        response,
      });
    },
    (error) => {
      dispatch({
        type: "FETCH_TODOS_FAILURE",
        filter,
        message: error.message || "Something went wrong.",
      });
    }
  );
};

export const addTodo = (text) => (dispatch) => {
  api.addTodo(text).then((response) => {
    dispatch({
      type: "ADD_TODO_SUCCESS",
      response,
    });
  });
};

/* ({
  type: "ADD_TODO",
  id: v4(),
  text,
}); */

export const toggleTodo = (id) => ({ type: "TOGGLE_TODO", id });
