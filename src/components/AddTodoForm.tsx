import React, { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { AuthContext } from "../context/AuthContext";
import { Todo } from "../models/Todo";

export const AddTodoForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const { user, addTodo } = useContext(AuthContext);

  console.log({user})

  const handleAddTodo = () => {
    if (title.trim() !== "") {
      const newTodo: Todo = {
        id: uuidv4(),
        title: title,
        completed: false,
        subTasks: [],
      };
      

      addTodo(newTodo);
      setTitle("");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter todo title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={handleAddTodo}>Add Todo</button>
    </div>
  );
};
