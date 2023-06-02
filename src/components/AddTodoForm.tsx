import React, { useContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { AuthContext } from "../context/AuthContext";
import { Todo } from "../models/Todo";
import { Form, Button, Row, Col, Alert, Toast } from "react-bootstrap";

export const AddTodoForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const { addTodo } = useContext(AuthContext);
  const [showToast, setShowToast] = useState(false);

  const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title) {
      setShowToast(true);
      return;
    }
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
      <Form onSubmit={handleAddTodo}>
        <Row className="align-items-center">
          <Col sm={9}>
            <Form.Control
              type="text"
              placeholder="I will do this ..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Col>
          <Col sm={3}>
            <Button
              className="w-100 mt-2 mt-sm-0"
              type="submit"
              variant="primary"
            >
              Add Todo
            </Button>
          </Col>
        </Row>
      </Form>

      {!title && (
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          className="mt-2"
        >
          <Toast.Body>Please enter a note</Toast.Body>
        </Toast>
      )}
    </div>
  );
};
