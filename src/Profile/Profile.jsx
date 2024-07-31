import { useState, useEffect } from "react";
import {
  Tabs,
  Tab,
  Container,
  Form,
  Button,
  ListGroup,
  Card,
  Spinner,
  Alert,
  Row
} from "react-bootstrap";
import { fetchOrdersByUsername } from "../service/ordersService";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../Redux/changeSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import authService from "../service/authService";
import { toast } from "react-toastify";
import "../styles/Profile.css";
import { setUser } from "../Redux/authSlice"; // Import setUser 
import { UserSquare } from "iconsax-react";

export default function Profile() {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const username = user?.username || "N/A";
  const email = user?.email || "N/A";
  const userID = user?.id || "N/A";

  useEffect(() => {
    localStorage.setItem("username", username);
    localStorage.setItem("email", email);
    localStorage.setItem("userID", userID);
  }, [username, email, userID]);

  // State for editing user information
  const [name, setName] = useState(localStorage.getItem("name") || user?.name);
  const [phone, setPhone] = useState(
    localStorage.getItem("phone") || user?.phone
  );
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    // Update local state with Redux user state
    if (user) {
      setName(user.name);
      setPhone(user.phone);
    }
  }, [user]);

  // Save user changes
  const handleSaveChanges = async (e) => {
    e.preventDefault();
    const userData = {
      name: name,
      phone: phone,
    };
    try {
      const updatedUser = await authService.update(userID, userData);
      setName(updatedUser.name);
      setPhone(updatedUser.phone);
      // Update Redux state
      dispatch(setUser(updatedUser));
      // Update localStorage with new values
      localStorage.setItem("name", updatedUser.name);
      localStorage.setItem("phone", updatedUser.phone);
      toast.success("Update information successfully");
    } catch (error) {
      console.error("Update information failed:", error);
      toast.error("Update information failed");
    }
  };

  // Change password
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    dispatch(changePassword({ currentPassword, newPassword, confirmPassword }));
  };

  // Fetch orders by username
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const orders = await fetchOrdersByUsername(username);
        setData(orders);
        setLoading(false);
      } catch (error) {
        setErrors(error.message);
        setLoading(false);
      }
    };

    fetchOrders();
  }, [username]);

  return (
    <>
    <Container className="wishlist-container">
    <Row>
        <UserSquare size="40" color="Black" />
      </Row>
      <div className="top-wishlist">
        <h1 className="text-wishlist">My Profile</h1>
      </div>
      {isLoggedIn ? (
        <Tabs
          defaultActiveKey="info"
          id="profile-tabs"
          className="mb-3 profile-tabs"
        >
          <Tab eventKey="info" title="Information">
            <Card className="profile-card">
              <Card.Body>
                <h4 className="card-title">User Information</h4>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <strong>Username:</strong> {username}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Name:</strong> {name}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Email:</strong> {email}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Phone number:</strong> {phone}
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Tab>
          <Tab eventKey="edit" title="Edit">
            <Card className="profile-card">
              <Card.Body>
                <h4 className="card-title">Edit Information</h4>
                <Form onSubmit={handleSaveChanges}>
                  <Form.Group controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" value={username} readOnly />
                  </Form.Group>
                  <Form.Group controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={email} readOnly />
                  </Form.Group>
                  <Form.Group controlId="formPhone">
                    <Form.Label>Phone number</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </Form.Group>
                  <Button
                    variant="secondary"
                    type="submit"
                    className="mt-3 button-secondary"
                  >
                    Save Changes
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Tab>
          <Tab eventKey="order" title="Order">
            <Card className="profile-card">
              <Card.Body>
                <h4 className="card-title">Order History</h4>
                {loading ? (
                  <Spinner animation="border" />
                ) : errors ? (
                  <Alert variant="danger">{errors}</Alert>
                ) : (
                  <ListGroup variant="flush">
                    {data.length > 0 ? (
                      data.map((order) => (
                        <ListGroup.Item key={order.id}>
                          <strong>Order #{order.id}</strong>
                          <ul>
                            {order.attributes.products.map((product) => (
                              <li key={product.id}>
                                <strong>Name:</strong> {product.name},{" "}
                                <strong>Size:</strong> {product.size},{" "}
                                <strong>Price:</strong> ${product.price},{" "}
                                <strong>Quantity:</strong> {product.quantity}
                              </li>
                            ))}
                          </ul>
                        </ListGroup.Item>
                      ))
                    ) : (
                      <ListGroup.Item>No orders found.</ListGroup.Item>
                    )}
                  </ListGroup>
                )}
              </Card.Body>
            </Card>
          </Tab>
          <Tab eventKey="changePassword" title="Change Password">
            <Card className="profile-card">
              <Card.Body>
                <h4 className="card-title">Change Password</h4>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formOldPassword">
                    <Form.Label>Current Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter current password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="formNewPassword">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="formConfirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </Form.Group>
                  <Button
                    variant="secondary"
                    type="submit"
                    className="mt-3 button-secondary"
                    disabled={loading}
                  >
                    {loading ? (
                      <Spinner animation="border" size="sm" />
                    ) : (
                      "Change Password"
                    )}
                  </Button>
                  {errors && (
                    <Alert variant="danger" className="mt-3">
                      {errors}
                    </Alert>
                  )}
                </Form>
              </Card.Body>
            </Card>
          </Tab>
        </Tabs>
      ) : (
        <Alert variant="danger" className="mt-3">
          You need to log in to view this page.
        </Alert>
      )}
    </Container>
    </>
  );
}
