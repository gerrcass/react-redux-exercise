const byId = (state = {}, action) => {
  switch (action.type) {
    case "FETCH_TODOS_SUCCESS":
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
    case "ADD_TODO_SUCCESS":
      return { ...state, [action.response.id]: action.response };
    default:
      return state;
  }
};

export default byId;

export const getTodo = (state, id) => state[id];
