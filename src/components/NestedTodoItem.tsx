import React from "react";
import { SubTask } from "../models/Todo";
import { Card } from "react-bootstrap";
import { BsCheck } from "react-icons/bs";

export const NestedTodoItem: React.FC<{ subTask: SubTask }> = ({ subTask }) => {
  return (
    <Card
      bg="secondary"
      text="white"
      className="mb-2"
      style={{
        width: "90%",
        margin: "0 auto",
        borderRadius: "0.25rem",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        transition: "box-shadow 0.3s ease-in-out",
      }}
    >
      <Card.Body className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <input
            className="mx-2"
            type="checkbox"
            checked={subTask.completed}
            readOnly
          />
          <span className="ml-2" style={{ marginTop: "2px" }}>
            {subTask.title}
          </span>
        </div>
        {subTask.completed && <BsCheck color="green" />}
      </Card.Body>
    </Card>
  );
};
