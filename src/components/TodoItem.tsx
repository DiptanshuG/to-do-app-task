import React from "react";
import { Todo, SubTask } from "../models/Todo";
import { NestedTodoItem } from "./NestedTodoItem";
import { Form } from "react-bootstrap";
import { Card, Dropdown, DropdownButton } from "react-bootstrap";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BsStar, BsPencil, BsTrash } from "react-icons/bs";

export const TodoItem: React.FC<{ todo: Todo }> = ({ todo }) => {
  return (
    <div>
        <Card
      bg="light"
      text="dark"
      className="mb-3"
      style={{
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        transition: "box-shadow 0.3s ease-in-out",
      }}
    >
      <Card.Body className="d-flex justify-content-between align-items-center">
        <Form.Check
          type="checkbox"
          checked={todo.completed}
          readOnly
          label={todo.title}
        />
        <DropdownButton
          id={`dropdown-button-${todo.id}`}
          title={<BsThreeDotsVertical />}
          variant="secondary"
          className="ml-2"
        >
          <Dropdown.Item eventKey="1">
            <BsStar /> Star Mark
          </Dropdown.Item>
          <Dropdown.Item eventKey="2">
            <BsPencil /> Edit
          </Dropdown.Item>
          <Dropdown.Item eventKey="3">
            <BsTrash /> Delete
          </Dropdown.Item>
        </DropdownButton>
      </Card.Body>
    </Card>
      {todo.subTasks.map((subTask: SubTask) => (
        <NestedTodoItem key={subTask.id} subTask={subTask} />
      ))}
    </div>
  );
};
