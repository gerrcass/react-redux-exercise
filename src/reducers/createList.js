import { combineReducers } from "redux";
const createList = (filter) => {
  const ids = (state = [], action) => {
    if (action.filter !== filter) {
      return state;
    }
    switch (action.type) {
      case "RECEIVE_TODOS":
        return action.response.map((t) => t.id);
      default:
        return state;
    }
  };
  const getIsFetching = (state = false, action) => {
    if (action.filter !== filter) {
      return state;
    }
    switch (action.type) {
      case "REQUEST_TODOS":
        return true;
      case "RECEIVE_TODOS":
        return false;
      default:
        state;
    }
  };

  return combineReducers({ ids, getIsFetching });
};

export default createList;

export const getIds = (state) => state.ids;
export const getIsFetching = (state) => state.getIsFetching;
