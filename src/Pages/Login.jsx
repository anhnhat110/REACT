import  { useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { login, setUser, logout } from "../Redux/authSlice";
import "../styles/Login.css"

export default function Login() {
  const { isLoggedIn, username } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const storedUsername = localStorage.getItem("username");
    if (loggedIn && storedUsername) {
      dispatch(setUser(storedUsername));
    }
  }, [dispatch]);

  const handleChange = (e) => {
    dispatch(setUser(e.target.value));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const user = {
      identifier: e.target.identifier.value,
      password: e.target.password.value,
    };
    {
      const actionResult = await dispatch(login(user));
      if (login.fulfilled.match(actionResult)) {
        navigate("/");
      }
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/home");
  };

  return (
    <div>
      <section className="vh-200 d-flex align-items-center justify-content-center bg-light">
        <Container className="login-container">
          <Row className="d-flex justify-content-center">
            <Col md={8} lg={6} xl={4}>
              <div className="card shadow-sm">
                <div className="card-body p-4">
                  {isLoggedIn ? (
                    <div>
                      <h3 className="mb-4 text-center">
                        Welcome to Maverick, {username}
                      </h3>
                      <div className="text-center">
                        <Button
                          variant="secondary"
                          size="lg"
                          onClick={handleLogout}
                        >
                          Logout
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h1 className="mb-4 text-center">Sign in</h1>
                      <Form onSubmit={handleLogin}>
                        <Form.Group
                          controlId="formBasicUsername"
                          className="mb-4"
                        >
                          <Form.Label>Username</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter Username"
                            name="identifier"
                            onChange={handleChange}
                          />
                        </Form.Group>

                        <Form.Group
                          controlId="formBasicPassword"
                          className="mb-3"
                        >
                          <Form.Label>Password</Form.Label>
                          <Form.Control
                            type="password"
                            placeholder="Enter Password"
                            name="password"
                          />
                        </Form.Group>

                        <div className="text-center">
                          <Button variant="secondary" size="lg" type="submit">
                            Login
                          </Button>
                          <p className="small fw-bold mt-3">
                            Do you want to create an account?{" "}
                            <NavLink to="/register" className="link-danger">
                              Register
                            </NavLink>
                          </p>
                        </div>
                      </Form>
                    </div>
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}