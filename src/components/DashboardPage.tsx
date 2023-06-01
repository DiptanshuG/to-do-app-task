import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Todo } from "../models/Todo";
import { TodoItem } from "./TodoItem";
import { AddTodoForm } from "./AddTodoForm";
import { Container, Row, Col, Card, CardHeader, CardBody, Button } from "reactstrap";

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
    <Container>
      <Row>
        <Col>
          <Card>
            <CardHeader>
              <h1>Dashboard</h1>
              <h2>Welcome, {user?.name}!</h2>
            </CardHeader>
            <CardBody>
              <Button color="primary" onClick={handleLogout}>
                Logout
              </Button>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <h3>Todos:</h3>
          {user?.todos.map((todo: Todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </Col>
      </Row>

      <Row>
        <Col>
          <h3>Add Todo:</h3>
          <AddTodoForm />
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardPage;
