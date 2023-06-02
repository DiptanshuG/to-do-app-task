import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { mockSignIn } from "../services/AuthService";
import { Container, Form, Button, Alert } from "react-bootstrap";
import todoImg from "../assets/img/todoAppImg.png";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { setAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (mockSignIn(username, password)) {
      setError("");
      setAuthenticated(true);
      navigate("/dashboard");
    } else {
      setError("Invalid username or password.");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ background: "#f8f9fa" }}
    >
      <Container className="p-2 rounded  d-flex justify-content-center">
      <div
          className="d-flex flex-lg-row flex-column justify-content-around rounded border border-secondary border-1 shadow"
          style={{ background: "rgb(0 0 0)" }}
        >
          <div className="m-5">
            <img
              style={{
                width: "15rem",
                height: "20rem",

                borderRadius: "10px",
                backgroundColor: "#e8e8e8",
              }}
              src={todoImg}
              alt="todoImg"
            />
          </div>
          <div className="m-5">
            {" "}
            <Form onSubmit={handleLogin}>
              <h1
                style={{
                  fontFamily: "Georgia, serif",
                  fontWeight: "bold",
                  fontSize: "2rem",
                }}
                className="text-center text-white"
              >
                Login
              </h1>
              <Form.Group controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-2" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Button className="w-100" variant="primary" type="submit">
                Login
              </Button>
              {error && (
                <Alert className="mt-2" variant="danger">
                  {error}
                </Alert>
              )}
            </Form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default LoginPage;
