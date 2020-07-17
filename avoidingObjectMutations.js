const toggloTodo = (todo) => {
  // using Object.assign() instead returning the same object mutated
  return { ...todo, completed: !todo.completed }; // syntax sugar for --> return Object.assign({}, todo, { completed: !todo.completed }); // since deepFreeze(todoBefore) was previously called.

  /* //This works, but you'll have to add new properties when needed because it is hardcoded
  return {
    id: todo.id,
    text: todo.text,
    completed: !todo.completed,
  }; */

  /*   //Mutation:
  todo.completed = !todo.completed;
  return todo; */
};

const testToggloTodo = () => {
  const todoBefore = {
    id: 0,
    text: "Learn Redux",
    completed: false,
  };
  const todoAfter = {
    id: 0,
    text: "Learn Redux",
    completed: true,
  };

  deepFreeze(todoBefore); //recursively Object.freeze() objects

  expect(toggloTodo(todoBefore)).toEqual(todoAfter);
};

testToggloTodo();
console.log("Avoiding Object Mutations: All tests passed.");
