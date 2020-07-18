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
