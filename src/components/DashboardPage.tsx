import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Todo } from "../models/Todo";
import { TodoItem } from "./TodoItem";
import { AddTodoForm } from "./AddTodoForm";

const DashboardPage: React.FC = () => {
  const { authenticated, logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!authenticated) {
    return null;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Welcome, {user?.name}!</h2>
      <button onClick={handleLogout}>Logout</button>

      <h3>Todos:</h3>
      {user?.todos.map((todo: Todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}

      <h3>Add Todo:</h3>
      <AddTodoForm />
    </div>
  );
};

export default DashboardPage;
