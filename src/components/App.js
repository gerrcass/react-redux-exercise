import React from "react";
import { useParams } from "react-router-dom";
import AddTodo from "./AddTodo";
import VisibleTodoList from "./VisibleTodoList";
import Footer from "./Footer";

const App = () => (
  <>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </>
);

export default App;
