const todo = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return { id: action.id, text: action.text, completed: false };
    case "TOGGLE_TODO":
      if (state.id !== action.id) {
        return state;
      }
      return { ...state, completed: !state.completed };
    default:
      return state;
  }
};
const todos = (state = [], action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, todo(undefined, action)];
    case "TOGGLE_TODO":
      return state.map((t) => todo(t, action));

    /* // The same as above but using conditional (ternary) operator
          return state.map((todo) =>
            todo.id !== action.id ? todo : { ...todo, completed: !todo.completed }
          ); */
    default:
      return state;
  }
};

export default todos;

// The default export is always the reducer function, but any named export starting with get is a so called SELECTOR,
// that is to say a function that prepares the data to be displayed by the UI.
export const getVisibleTodos = (state, filter) => {
  switch (filter) {
    case "all":
      return state;
    case "completed":
      return state.filter((todo) => todo.completed);
    case "active":
      return state.filter((todo) => !todo.completed);
  }
};
