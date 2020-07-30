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
  delay(500).then(() => {
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
