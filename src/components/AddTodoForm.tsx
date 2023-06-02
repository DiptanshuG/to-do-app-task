import React, { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { AuthContext } from "../context/AuthContext";
import { Todo } from "../models/Todo";
import { Form, Button, Row, Col } from "react-bootstrap";

export const AddTodoForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const { addTodo } = useContext(AuthContext);

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
    <Form>
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
          <Button onClick={handleAddTodo} variant="primary">
            Add Todo
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
