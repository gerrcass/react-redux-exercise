import { combineReducers } from "redux";

const createList = (filter) => {
  const ids = (state = [], action) => {
    switch (action.type) {
      case "FETCH_TODOS_SUCCESS":
        return filter === action.filter
          ? action.response.map((t) => t.id)
          : state;
      case "ADD_TODO_SUCCESS":
        return filter !== "completed" ? [...state, action.response.id] : state;
      default:
        return state;
    }
  };
  const isFetching = (state = false, action) => {
    if (action.filter !== filter) {
      return state;
    }
    switch (action.type) {
      case "FETCH_TODOS_REQUEST":
        return true;
      case "FETCH_TODOS_SUCCESS":
      case "FETCH_TODOS_FAILURE":
        return false;
      default:
        state;
    }
  };

  const errorMessage = (state = null, action) => {
    if (action.filter !== filter) {
      return state;
    }
    switch (action.type) {
      case "FETCH_TODOS_FAILURE":
        return action.message;
      case "FETCH_TODOS_REQUEST":
      case "FETCH_TODOS_SUCCESS":
        return null;
      default:
        state;
    }
  };

  return combineReducers({ ids, isFetching, errorMessage });
};

export default createList;

export const getIds = (state) => state.ids;
export const getIsFetching = (state) => state.isFetching;
export const getErrorMessage = (state) => state.errorMessage;
