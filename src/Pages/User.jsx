import { Header } from "../Component/Header";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Outlet, NavLink } from "react-router-dom";
import { useState } from "react"; // Import useState hook for form state management

export default function User() {
  const [username, setUsername] = useState(""); // State for username input
  const [password, setPassword] = useState(""); // State for password input

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    // Perform login logic here (e.g., API call, validation)
    console.log("Logging in with:", username, password);
  };

  return (
    <div>
      <Header />
      <section className="vh-100">
        <Container fluid className="h-custom">
          <Row className="d-flex justify-content-center align-items-center h-100">
            <Col md={8} lg={6} xl={4} className="offset-xl-1">
              <Form onSubmit={handleSubmit}>
                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start mb-4">
                  <p className="lead fw-normal mb-0 me-3">
                    Do you have an account?
                  </p>
                </div>
                <Form.Group controlId="formBasicEmail" className="mb-4">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                <div className="d-flex justify-content-between align-items-center">
                  <Form.Check
                    type="checkbox"
                    label="Remember me"
                    id="form2Example3"
                  />
                  <NavLink to="/resetpassword" className="text-body">
                    Forgot password?
                  </NavLink>
                </div>

                <div className="text-center text-lg-start mt-4 pt-2">
                  <Button
                    variant="secondary"
                    size="lg"
                    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                    type="submit" // Submit button
                  >
                    Login
                  </Button>
                  <p className="small fw-bold mt-2 pt-1 mb-0">
                    {" "}
                    Don't have an account?{" "}
                    <NavLink to="/register" className="link-danger">
                      Register
                    </NavLink>
                  </p>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
        <Outlet /> {/* Render nested routes */}
      </section>
    </div>
  );
}
