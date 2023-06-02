import React from "react";
import { Navbar, Nav, Button, Dropdown } from "react-bootstrap";
import logo from "../assets/img/todo_icon.png";

interface User {
  name: string;
}

interface AppNavbarProps {
  user?: User | null;
  handleLogout: () => void;
}

const AppNavbar: React.FC<AppNavbarProps> = ({ user, handleLogout }) => {
  const userName = user?.name || "Guest";
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <div className="m-2">
        {" "}
        <img style={{ height: "2rem", width: "2rem" }} src={logo} alt="" />
        <Navbar.Brand className="m-2" href="/" style={{ cursor: "pointer" }}>
          Your Todos App
        </Navbar.Brand>
      </div>
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav" className="justify-content-end">
        <Nav className="mx-4">
          <Navbar.Text className="ml-auto gap-3">
            <span className="mx-4"> Welcome, {userName}!</span>
            {user && (
              <Button variant="primary" onClick={handleLogout} className="ml-2">
                Logout
              </Button>
            )}
          </Navbar.Text>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AppNavbar;
