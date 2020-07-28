import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import { getVisibleTodos } from "../reducers";
import TodoList from "./TodoList";

class VisibleTodoList extends React.Component {
  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.filter !== prevProps.filter) {
      this.fetchData();
    }
  }
  fetchData() {
    const { filter, fetchTodos } = this.props;
    fetchTodos(filter);
  }

  render() {
    const { toggleTodo, ...rest } = this.props;
    return <TodoList onTodoClick={toggleTodo} {...rest} />;
  }
}

const mapStateToProps = (state, { match: { params } }) => {
  const filter = params.filter || "all";
  return {
    todos: getVisibleTodos(state, filter),
    filter, // to be used in the component this.props within fetchData() function.
  };
};

// mapDispatchToProps shorthand: 'actions' turns into { toggleTodo: toggleTodo, receiveTodos: receiveTodos } or {toggleTodo, receiveTodos} using ES6.
export default withRouter(connect(mapStateToProps, actions)(VisibleTodoList));
