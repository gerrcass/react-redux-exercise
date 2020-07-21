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

// Action Creators
let nextTodoId = 0;
const addTodo = (text) => ({
  type: "ADD_TODO",
  id: nextTodoId++,
  text,
});

const setVisibilityFilter = (filter) => ({
  type: "SET_VISIBILITY_FILTER",
  filter,
});

const toggleTodo = (id) => ({ type: "TOGGLE_TODO", id });

// React-Redux Library

const { Provider, connect } = ReactRedux; //import {Provider,connect} from 'react-redux'

// React code

const Link = ({ active, children, onClick, filter }) => {
  return active ? (
    <span>{children}</span>
  ) : (
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
  /* // same as above
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
  ); */
};

const mapStateToLinkProps = (state, ownProps) => ({
  active: ownProps.filter === state.visibilityFilter,
});
const mapDispatchToLinkProps = (dispatch, ownProps) => ({
  onClick() {
    dispatch(setVisibilityFilter(ownProps.filter));
  },
  //onClick: () => {dispatch(setVisibilityFilter(ownProps.filter))}, // this line gets replaced by the previous one which is the same using ES6 syntax.
});
const FilterLink = connect(mapStateToLinkProps, mapDispatchToLinkProps)(Link);

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

let AddTodo = ({ dispatch }) => {
  let input;
  return (
    <>
      <input ref={(node) => (input = node)} />
      <button
        onClick={() => {
          dispatch(addTodo(input.value));
          input.value = "";
        }}
      >
        Add Todo
      </button>
    </>
  );
};
// in here connect() is equivalent to connect(null,null): The default behavior will be to not subscribe to the store and to inject just the dispatch function as a prop.
AddTodo = connect()(AddTodo);

/* In the expresion connect(null,null): 
- the first 'null' is telling connect that there's no need to subscribe to the store to get any state (this would be wasteful to do)
- the second 'null' just avoid the boilerplate code to inject dispatch as a props (end up the same result but with less code)

Otherwise, this would be necessary (but fortunately does not):

AddTodo = connect(
  (state) => {
    return {};
  },
  (dispatch) => {
    return { dispatch };
  }
)(AddTodo); */

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

const mapStateToTodoListProps = (state) => ({
  todos: getVisibleTodos(state.todos, state.visibilityFilter),
});
const mapDispatchToTodoListProps = (dispatch) => ({
  onTodoClick(id) {
    dispatch(toggleTodo(id));
  },
  //onTodoClick: (id) => dispatch(toggleTodo(id)),
});
const VisibleTodoList = connect(
  mapStateToTodoListProps,
  mapDispatchToTodoListProps
)(TodoList);

const TodoApp = () => (
  <>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </>
);

const persistedState = {
  todos: [{ id: "0", text: "Welcome Back!", completed: false }],
};
const { createStore } = Redux;

// starting the Redux store with a previously persisted state passed as a second argument to the createStore()
// notice how the visibilityFilter key of the Redux object state is set to initial state accordingly to its specific reducer
const store = createStore(todoApp, persistedState);
console.log(store.getState());

ReactDOM.render(
  <Provider store={store}>
    <TodoApp />
  </Provider>,
  document.getElementById("root")
);
