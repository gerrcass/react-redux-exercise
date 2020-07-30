import { v4 } from "uuid";

// mocking som REST API call
const fakeDatabase = {
  todos: [
    {
      id: v4(),
      text: "hey",
      completed: true,
    },
    {
      id: v4(),
      text: "ho",
      completed: true,
    },
    {
      id: v4(),
      text: `let's go`,
      completed: false,
    },
  ],
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchTodos = (filter) =>
  delay(600).then(() => {
    //throwing sometimes so that error handling can be tested
    if (Math.random() > 0.5) {
      throw new Error("Boom");
    }
    switch (filter) {
      case "all":
        return fakeDatabase.todos;
      case "active":
        return fakeDatabase.todos.filter((todo) => !todo.completed);
      case "completed":
        return fakeDatabase.todos.filter((todo) => todo.completed);
      default:
        throw new Error(`Unkown filter: ${filter}`);
    }
  });

export const addTodo = (text) =>
  delay(600).then(() => {
    const todo = {
      id: v4(),
      text,
      completed: false,
    };
    fakeDatabase.todos.push(todo);
    return todo;
  });

export const toggleTodo = (id) =>
  delay(600).then(() => {
    const todo = fakeDatabase.todos.find((t) => t.id === id);
    todo.completed = !todo.completed;
    return todo;
  });
