import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { registerUser } from "../service/registerService";
import "../styles/Register.css"

export default function Register() {
  const initialUser = { username: "", password: "", email: "" };
  const [user, setUser] = useState(initialUser);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      if (user.username && user.email && user.password) {
        const data = await registerUser(user);
        toast.success("Account created successfully!");
        localStorage.setItem("jwt", data.jwt);
        navigate("/login");
      } else {
        toast.error("Please fill in all fields.");
      }
    } catch (error) {
      toast.error(error.message, { hideProgressBar: true });
    }
  };

  return (
    <div>
      <section className="vh-200 d-flex align-items-center justify-content-center bg-light">
        <Container className="register-container">
          <Row className="d-flex justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <div className="card shadow-sm">
                <div className="card-body p-4">
                  <h1 className="mb-4 text-center">Register</h1>
                  <Form onSubmit={handleRegister}>
                    <Form.Group controlId="formBasicUsername" className="mb-3">
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Username"
                        name="username"
                        value={user.username}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail" className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter Email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword" className="mb-3">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Enter Password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>

                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <Form.Check
                        type="checkbox"
                        label="Remember me"
                        id="form2Example3"
                      />
                    </div>

                    <div className="text-center">
                      <Button variant="secondary" size="lg" type="submit">
                        Create an account
                      </Button>
                      <p className="small fw-bold mt-3">
                        Already have an account?{" "}
                        <NavLink to="/login" className="link-primary">
                          Login
                        </NavLink>
                      </p>
                    </div>
                  </Form>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        <Outlet />
      </section>
    </div>
  );
}
