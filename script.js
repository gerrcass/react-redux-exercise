/*
// Emulating the logic into createStore() function
const createStore = (reducer)=>{
    let state;
    let listeners[];
    const getState = () => state;
    const dispatch=(action)=>{
        state = reducer(state,action);
        listeners.forEach(listener => listener());
    }
    const subscribe=(listener)=>{
        listeners.push(listener);
        return () => {
            listeners.filter(l => l !== listener);
        }
    }
    dispatch({})
    
    return {getState,dispatch,subscribe}
}
 */

// Reducer
const counter = (state = 0, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
};

//Creating redux store
const store = Redux.createStore(counter);

// Dumb / Presentational Component.
const Counter = ({ value, onIncrement, onDecrement }) => (
  <div>
    <h1>{value}</h1>
    <button onClick={onIncrement}>+</button>
    <button onClick={onDecrement}>-</button>
  </div>
);

// Callback to be called whenever there are changes in the store
const render = () => {
  ReactDOM.render(
    <Counter
      value={store.getState()}
      onIncrement={() => store.dispatch({ type: "INCREMENT" })}
      onDecrement={() => store.dispatch({ type: "DECREMENT" })}
    />,
    document.getElementById("root")
  );
};
store.subscribe(render);

// calling callback for the first time
render();
