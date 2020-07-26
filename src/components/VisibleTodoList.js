import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { toggleTodo } from "../actions";
import { getVisibleTodos } from "../reducers";
import TodoList from "./TodoList";
import { fetchTodos } from "../api";
import todo from "../reducers/todo";

class VisibleTodoList extends React.Component {
  componentDidMount() {
    fetchTodos(this.props.filter).then((todos) =>
      console.log(this.props.filter, todos)
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.filter !== prevProps.filter) {
      fetchTodos(this.props.filter).then((todos) =>
        console.log(this.props.filter, todos)
      );
    }
  }

  render() {
    return <TodoList {...this.props} />;
  }
}

const mapStateToProps = (state, { match: { params } }) => {
  const filter = params.filter || "all";
  return {
    todos: getVisibleTodos(state, filter),
    filter, // to be used in componentDidMount()
  };
};

VisibleTodoList = withRouter(
  connect(mapStateToProps, { onTodoClick: toggleTodo })(VisibleTodoList)
);

export default VisibleTodoList;
