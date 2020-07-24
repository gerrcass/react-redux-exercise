//import React from "react";
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
const mapStateToProps = (state, ownProps) => ({
  todos: getVisibleTodos(state.todos, ownProps.filter),
});
const mapDispatchToProps = (dispatch) => ({
  onTodoClick(id) {
    dispatch(toggleTodo(id));
  },
  //onTodoClick: (id) => dispatch(toggleTodo(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
