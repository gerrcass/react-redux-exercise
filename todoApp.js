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

const Link = ({ active, children, onClick }) => {
  if (active) {
    return <span>{children}</span>;
  }
  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      {children}
    </a>
  );
};

class FilterLink extends Component {
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  }
  componenWillUnmount() {
    this.unsubscribe();
  }
  render() {
    const props = this.props;
    const state = store.getState();

    return (
      <Link
        active={props.filter === state.visibilityFilter}
        onClick={() =>
          store.dispatch({
            type: "SET_VISIBILITY_FILTER",
            filter: props.filter,
          })
        }
      >
        {props.children}
      </Link>
    );
  }
}

const Footer = () => (
  <p>
    Show: <FilterLink filter="SHOW_ALL">All</FilterLink>{" "}
    <FilterLink filter="SHOW_ACTIVE">Active</FilterLink>{" "}
    <FilterLink filter="SHOW_COMPLETED">Completed</FilterLink>{" "}
  </p>
);
const Todo = ({ onClick, completed, text }) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: completed ? "line-through" : "none",
    }}
  >
    {text}
  </li>
);

const TodoList = ({ todos, onTodoClick }) => (
  <ul>
    {todos.map((todo) => (
      <Todo key={todo.id} onClick={() => onTodoClick(todo.id)} {...todo} />
    ))}
  </ul>
);

const AddTodo = ({ onAddClick }) => {
  let input;
  return (
    <>
      <input ref={(node) => (input = node)} />
      <button
        onClick={() => {
          onAddClick(input.value);
          input.value = "";
        }}
      >
        Add Todo
      </button>
    </>
  );
};
const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case "SHOW_ALL":
      return todos;
    case "SHOW_COMPLETED":
      return todos.filter((todo) => todo.completed);
    case "SHOW_ACTIVE":
      return todos.filter((todo) => !todo.completed);
  }
};

let nextTodoId = 0;
const TodoApp = ({ todos, visibilityFilter }) => (
  <>
    <AddTodo
      onAddClick={(text) =>
        store.dispatch({
          type: "ADD_TODO",
          id: nextTodoId++,
          text,
        })
      }
    />
    <TodoList
      todos={getVisibleTodos(todos, visibilityFilter)}
      onTodoClick={(id) => store.dispatch({ type: "TOGGLE_TODO", id })}
    />
    <Footer />
  </>
);

const render = () => {
  ReactDOM.render(
    <TodoApp {...store.getState()} />,
    document.getElementById("root")
  );
};

store.subscribe(render);
render();
