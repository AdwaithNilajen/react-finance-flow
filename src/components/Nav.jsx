// rrd imports
import { Form, NavLink } from "react-router-dom";

// library
import { TrashIcon } from "@heroicons/react/24/solid";

// assets
import logomark from "../assets/logomark.svg";

// Bootstrap components
import { Navbar, Container, Nav, Button } from "react-bootstrap";

const NavBar = ({ userName }) => {
  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand as={NavLink} to="/" aria-label="Go to home">
          <img src={logomark} alt="HomeBudget Logo" height={30} className="me-2" />
          <span>HomeBudget</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {userName && (
              <Form
                method="post"
                action="logout"
                onSubmit={(event) => {
                  if (!confirm("Delete user and all data?")) {
                    event.preventDefault();
                  }
                }}
              >
                <Button variant="danger" type="submit" className="d-flex align-items-center">
                  <TrashIcon width={20} className="me-2" />
                  <span>Delete User</span>
                </Button>
              </Form>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
