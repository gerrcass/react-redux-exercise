import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { toggleTodo } from "../actions";
import { getVisibleTodos } from "../reducers";

import TodoList from "./TodoList";

const mapStateToProps = (
  state,
  {
    match: {
      params: { filter },
    },
  }
) => ({
  todos: getVisibleTodos(state, filter || "all"),
});

/* const mapDispatchToProps = (dispatch) => ({
  onTodoClick(id) {
    dispatch(toggleTodo(id));
  },
  //onTodoClick: (id) => dispatch(toggleTodo(id)),
}); */

/* mapDispatchToProps shorthand { onTodoClick: toggleTodo }: when the arguments passed through the callback 
props injected to the component are passed through to the action creators in the same order, it can be passed 
a configuration object so that, under the hood, dispatch() maps the names of the callback props to the 
corresponding action creator function. */
export default withRouter(
  connect(mapStateToProps, { onTodoClick: toggleTodo })(TodoList)
);
