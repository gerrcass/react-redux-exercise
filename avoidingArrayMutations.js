const addCounter = (list) => {
  //using concat() and avoiding push() which is a mutation method
  return [...list, 0]; // syntax sugar for (ES6 spread operator) --> return list.concat([0]); // since deepFreeze(listBefore) was previously called.

  /* //Mutation:
   list.push(0)
   return list
    */
};

const removeCounter = (list, index) => {
  //using slice() and avoiding splice() which is a mutation method
  return [...list.slice(0, index), ...list.slice(index + 1)]; // syntax sugar for (ES6 spread operator) --> return list.slice(0, index).concat(list.slice(index + 1)); // since deepFreeze(listBefore) was previously called.

  /* //Mutation: 
  list.splice(index, 1);
  return list; */
};

const incrementCounter = (list, index) => {
  // using slice() and avoiding list[index]++ which mutate the array
  return [...list.slice(0, index), list[index] + 1, ...list.slice(index + 1)]; // syntax sugar for (ES6 spread operator) --> return list.slice(0, index).concat(list[index] + 1).concat(list.slice(index + 1)); // since deepFreeze(listBefore) was previously called.

  /* //Mutation:
  list[index]++;
  return list; */
};

const testAddCounter = () => {
  const listBefore = [];
  const listAfter = [0];

  deepFreeze(listBefore); //recursively Object.freeze() objects (apply to arrays too)

  expect(addCounter(listBefore)).toEqual(listAfter);
};

// TESTING RESULTS

const testRemoveCounter = () => {
  const listBefore = [0, 10, 20];
  const listAfter = [0, 20];

  deepFreeze(listBefore); //recursively Object.freeze() objects (apply to arrays too)

  expect(removeCounter(listBefore, 1)).toEqual(listAfter);
};

const testIncrementCounter = () => {
  const listBefore = [0, 10, 20];
  const listAfter = [0, 11, 20];

  deepFreeze(listBefore); //recursively Object.freeze() objects (apply to arrays too)

  expect(incrementCounter(listBefore, 1)).toEqual(listAfter);
};

// CALLING TESTS FUNCTIONS
testAddCounter();
testRemoveCounter();
testIncrementCounter();

// console if everything is ok
console.log("All tests passed.");
