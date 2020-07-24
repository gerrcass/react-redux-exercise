import React from "react";
import { useParams } from "react-router-dom";
import AddTodo from "./AddTodo";
import VisibleTodoList from "./VisibleTodoList";
import Footer from "./Footer";

const App = () => {
  const { filter } = useParams();
  return (
    <>
      <AddTodo />
      <VisibleTodoList filter={filter || "all"} />
      <Footer />
    </>
  );
};

export default App;
