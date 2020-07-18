// Reducers code
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

const visibilityFilter = (state = "SHOW_ALL", action) => {
  switch (action.type) {
    case "SET_VISIBILITY_FILTER":
      return action.filter;
    default:
      return state;
  }
};

const { Component } = React;
const { combineReducers } = Redux;

const todoApp = combineReducers({
  todos,
  visibilityFilter,
});

// Creating a Store with the above reducer

const { createStore } = Redux;
const store = createStore(todoApp);

let nextTodoId = 0;
class TodoApp extends Component {
  render() {
    console.log(store.getState());
    return (
      <div>
        <input ref={(node) => (this.input = node)} />
        <button
          onClick={() => {
            store.dispatch({
              type: "ADD_TODO",
              id: nextTodoId++,
              text: this.input.value,
            });
            this.input.value = "";
          }}
        >
          Add Todo
        </button>
        <ul>
          {this.props.todos.map((todo) => (
            <li key={todo.id}>{todo.text}</li>
          ))}
        </ul>
      </div>
    );
  }
}

const render = () => {
  ReactDOM.render(
    <TodoApp todos={store.getState().todos} />,
    document.getElementById("root")
  );
};

store.subscribe(render);
render();
