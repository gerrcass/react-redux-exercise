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

const AppContext = React.createContext();

// React code

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
  //static contextType = AppContext; // can be used this way instead of FilterLink.contextType = AppContext
  componentDidMount() {
    const store = this.context;
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  }
  componenWillUnmount() {
    this.unsubscribe();
  }
  render() {
    const props = this.props;
    const store = this.context;
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
FilterLink.contextType = AppContext; //subscribing context to this component (it receives this.context)

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

let nextTodoId = 0;
const AddTodo = () => {
  let input;
  const store = React.useContext(AppContext); //Hook to subscribe context to this functional component
  return (
    <>
      <input ref={(node) => (input = node)} />
      <button
        onClick={() => {
          store.dispatch({
            type: "ADD_TODO",
            id: nextTodoId++,
            text: input.value,
          });
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

class VisibleTodoList extends Component {
  //static contextType = AppContext; // can be used this way instead of VisibleTodoList.contextType = AppContext
  componentDidMount() {
    const store = this.context;
    this.unsubdcribe = store.subscribe(() => this.forceUpdate());
  }
  componenWillUnmount() {
    this.unsubdcribe();
  }
  render() {
    const store = this.context;
    const { todos, visibilityFilter } = store.getState();
    return (
      <TodoList
        todos={getVisibleTodos(todos, visibilityFilter)}
        onTodoClick={(id) => store.dispatch({ type: "TOGGLE_TODO", id })}
      />
    );
  }
}
VisibleTodoList.contextType = AppContext; //subscribing context to this component (it receives this.context)

const TodoApp = () => (
  <>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </>
);

const { createStore } = Redux;

ReactDOM.render(
  <AppContext.Provider value={createStore(todoApp)}>
    <TodoApp />
  </AppContext.Provider>,
  document.getElementById("root")
);
