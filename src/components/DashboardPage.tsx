import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Todo } from "../models/Todo";
import { TodoItem } from "./TodoItem";
import { AddTodoForm } from "./AddTodoForm";
import { Container, Row, Col, Button } from "react-bootstrap";
import AppNavbar from "./AppNavbar";

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
    <>
      <AppNavbar handleLogout={handleLogout} user={user} />
      <Container >
       <div className="mt-2 rounded p-4" style={{background:"rgb(223, 220, 204)"}}>
       <Row className="mt-4">
          <Col>
            <h1 className="text-primary">Your Todo List</h1>

            <p className="text-muted">
              Stay organized and boost your productivity with our simple and
              intuitive Todo app.
            </p>
            <p className="text-muted">
              Create, manage, and track your tasks effortlessly to make the most
              out of your day.
            </p>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col>
          <h3 className="stylish-font">Add Todo:</h3>
            <AddTodoForm />
          </Col>
        </Row>
       </div>

        {!!user?.todos && user?.todos.length > 0 && (
          <Row className="mt-4">
            <Col>
            <h3 className="stylish-font">Todos:</h3>
              {user?.todos.map((todo: Todo) => (
                <TodoItem key={todo.id} todo={todo} />
              ))}
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
};

export default DashboardPage;
