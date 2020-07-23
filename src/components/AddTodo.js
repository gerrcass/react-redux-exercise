import React from "react";
import { connect } from "react-redux";
import { addTodo } from "../actions/index";

const AddTodo = ({ dispatch }) => {
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
export default connect()(AddTodo);

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
