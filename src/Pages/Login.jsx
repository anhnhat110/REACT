// src/Login.js
import { useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Heart } from "iconsax-react";
import { useSelector, useDispatch } from "react-redux";
import { setUser, loginSuccess, logout } from "../Redux/authSlice";
import Footer from "../Component/Footer";

export default function Login() {

  const { user, isLoggedIn, username } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const storedUsername = localStorage.getItem("username");
    if (loggedIn && storedUsername) {
      dispatch(loginSuccess({ username: storedUsername }));
    }
  }, [dispatch]);

  const handleChange = (e) => {
    dispatch(setUser({ field: e.target.name, value: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const url = "http://localhost:1338/api/auth/local";
    try {
      if (user.identifier && user.password) {
        await axios.post(url, user);
        toast.success("Logged in successfully!");
        const loggedUsername = user.identifier;
        dispatch(loginSuccess({ username: loggedUsername }));
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("username", loggedUsername);
        navigate("/home");
      } else {
        toast.error("Please fill in all fields.");
      }
    } catch (error) {
      toast.error(error.message, { hideProgressBar: true });
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    navigate("/");
  };

  useEffect(() => {
    console.log("isLoggedIn after login:", isLoggedIn);
  }, [isLoggedIn]);

  return (
    <>
    <div>
      <section className="vh-200 d-flex align-items-center justify-content-center bg-light">
        <Container>
          <Row className="d-flex justify-content-center">
            <Col md={8} lg={6} xl={4}>
              <div className="card shadow-sm">
                <div className="card-body p-4">
                  {isLoggedIn ? (
                    <div>
                      <h3 className="mb-4 text-center">
                        Welcome to Maverick, {username}{" "}
                        <Heart size="32" color="red" variant="Bold" />
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
                            value={user.identifier}
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
                            value={user.password}
                            onChange={handleChange}
                          />
                        </Form.Group>

                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <Form.Check
                            type="checkbox"
                            label="Remember me"
                            id="form2Example3"
                          />
                          <NavLink to="/resetpassword" className="text-body">
                            Forgot password?
                          </NavLink>
                        </div>

                        <div className="text-center">
                          <Button variant="secondary" size="lg" type="submit">
                            Login
                          </Button>
                          <p className="small fw-bold mt-3">
                            Dont have an account?{" "}
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
        <Outlet />
      </section>
    </div>
    <Footer/>
    </>
  );
}
