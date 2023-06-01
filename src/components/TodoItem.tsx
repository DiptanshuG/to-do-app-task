import React from "react";
import { Todo, SubTask } from "../models/Todo";
import { NestedTodoItem } from "./NestedTodoItem";

export const TodoItem: React.FC<{ todo: Todo }> = ({ todo }) => {
  return (
    <div>
      <input type="checkbox" checked={todo.completed} readOnly />
      <span>{todo.title}</span>
      {todo.subTasks.map((subTask: SubTask) => (
        <NestedTodoItem key={subTask.id} subTask={subTask} />
      ))}
    </div>
  );
};
