import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import { getVisibleTodos, getIsFetching } from "../reducers";
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

    /* .then() can be used to schedule some code afterward since a Promise
    was always returned in this particular async action creator (thunk):
    fetchTodos(filter).then(() => console.log("done!")); */
    fetchTodos(filter);
  }

  render() {
    const { toggleTodo, todos, isFetching } = this.props;
    if (isFetching && !todos.length) {
      return <p>Loading...</p>;
    }
    return <TodoList onTodoClick={toggleTodo} todos={todos} />;
  }
}

const mapStateToProps = (state, { match: { params } }) => {
  const filter = params.filter || "all"; //coming from WithRouter() accessed here via 'ownProps'
  return {
    todos: getVisibleTodos(state, filter),
    isFetching: getIsFetching(state, filter),
    filter, // to be used in the component this.props within fetchData() function.
  };
};

// mapDispatchToProps shorthand: 'actions' turns into { toggleTodo: toggleTodo, receiveTodos: receiveTodos } or {toggleTodo, receiveTodos} using ES6.
export default withRouter(connect(mapStateToProps, actions)(VisibleTodoList));
