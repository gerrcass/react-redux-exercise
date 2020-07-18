// Reducer Composition: separating concerns by letting each function handle a single operation.
// todo() handles individuals ToDo and todos() handles the list of Todo's.
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
      /* while not required in this case, it is suggested that always have the default case
        where you return the current state to avoid possibles bugs in the future. */
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

const visibilityFilter = (state = "SHOW_ALL", action) => {
  switch (action.type) {
    case "SET_VISIBILITY_FILTER":
      return action.filter;
    default:
      return state;
  }
};

/* 
// Creating a top level reducer for the App
const todoApp = (state = {}, action) => {
  return {
    todos: todos(state.todos, action),
    visibilityFilter: visibilityFilter(state.visibilityFilter, action),
  };
}; */

// Since the above pattern is so common for most applications, Redux comes with a helper function called combineReducers() to minimize boilerplate code.
//const { combineReducers } = Redux;

// Implementing my own combineReducers() function from scratch.
const combineReducers = (reducers) => {
  return (state = {}, action) => {
    return Object.keys(reducers).reduce((nextState, key) => {
      nextState[key] = reducers[key](state[key], action);
      return nextState;
    }, {});
  };
};
const todoApp = combineReducers({
  todos,
  visibilityFilter,
});

// Creating a Store with the above reducer

const { createStore } = Redux;
const store = createStore(todoApp);

console.log("Initial state:");
console.log(store.getState());
console.log("--------------");

console.log("Dispatching ADD_TODO.");
store.dispatch({
  type: "ADD_TODO",
  id: 0,
  text: "Learn Redux",
});

console.log("Current state:");
console.log(store.getState());
console.log("--------------");

console.log("Dispatching ADD_TODO.");
store.dispatch({
  type: "ADD_TODO",
  id: 1,
  text: "Go shopping",
});

console.log("Current state:");
console.log(store.getState());
console.log("--------------");

console.log("Dispatching TOGGLE_TODO.");
store.dispatch({
  type: "TOGGLE_TODO",
  id: 0,
});

console.log("Current state:");
console.log(store.getState());
console.log("--------------");

console.log("Dispatching SET_VISIBILITY_FILTER.");
store.dispatch({
  type: "SET_VISIBILITY_FILTER",
  filter: "SHOW_COMPLETED",
});

console.log("Current state:");
console.log(store.getState());
console.log("--------------");

// Testing pure functions (inputs values treated as immutable) by using expect() assertion library

const testAddTodo = () => {
  const stateBefore = [];

  const accion = {
    type: "ADD_TODO",
    id: 0,
    text: "Learn Redux",
  };
  const stateAfter = [
    {
      id: 0,
      text: "Learn Redux",
      completed: false,
    },
  ];
  deepFreeze(stateBefore); //recursively Object.freeze() objects
  deepFreeze(accion); //recursively Object.freeze() objects

  expect(todos(stateBefore, accion)).toEqual(stateAfter);
};

const testToggleTodo = () => {
  const stateBefore = [
    {
      id: 0,
      text: "Learn Redux",
      completed: false,
    },
    {
      id: 1,
      text: "Go shopping",
      completed: false,
    },
  ];
  const action = {
    type: "TOGGLE_TODO",
    id: 1,
  };
  const stateAfter = [
    {
      id: 0,
      text: "Learn Redux",
      completed: false,
    },
    {
      id: 1,
      text: "Go shopping",
      completed: true,
    },
  ];
  deepFreeze(stateBefore);
  deepFreeze(action);
  expect(todos(stateBefore, action)).toEqual(stateAfter);
};

testAddTodo();
testToggleTodo();
console.log("Testing Todo Reducer: All tests passed.");
