import React from "react";
import { SubTask } from "../models/Todo";

export const NestedTodoItem: React.FC<{ subTask: SubTask }> = ({ subTask }) => {
  


  return (
    <div>
      <input type="checkbox" checked={subTask.completed} readOnly />
      <span>{subTask.title}</span>
    </div>
  );
};
