import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { toggleTodo } from "../actions/index";
import TodoList from "./TodoList";

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case "all":
      return todos;
    case "completed":
      return todos.filter((todo) => todo.completed);
    case "active":
      return todos.filter((todo) => !todo.completed);
  }
};
const mapStateToProps = (
  state,
  {
    match: {
      params: { filter },
    },
  }
) => ({
  todos: getVisibleTodos(state.todos, filter || "all"),
});
/* const mapDispatchToProps = (dispatch) => ({
  onTodoClick(id) {
    dispatch(toggleTodo(id));
  },
  //onTodoClick: (id) => dispatch(toggleTodo(id)),
}); */

/* mapDispatchToProps shorthand: when the arguments passed through the callback props injected to the
component are passed through to the action creators in the same order, it can be passed a configuration
object so that, under the hood, dispatch() maps the names of the callback props to the corresponding
action creator function. */
export default withRouter(
  connect(mapStateToProps, { onTodoClick: toggleTodo })(TodoList)
);
