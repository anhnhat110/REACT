import { useState, useEffect } from 'react';
import { Tabs, Tab, Container, Form, Button, ListGroup, Card, Spinner, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import './Profile.css';
import { changePassword } from '../Redux/changeSlice';
import { fetchOrdersByUsername } from '../service/ordersService';

export default function Profile() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);
  const orders = useSelector((state) => state.orders.orders);
  const ordersLoading = useSelector((state) => state.orders.loading);
  const ordersError = useSelector((state) => state.orders.error);

  const username = localStorage.getItem('username');
  const email = localStorage.getItem('email');

  const [name, setName] = useState(localStorage.getItem('name') || '');
  const [phone, setPhone] = useState(localStorage.getItem('phone') || '');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSaveChanges = (e) => {
    e.preventDefault();
    localStorage.setItem('name', name);
    localStorage.setItem('phone', phone);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(changePassword({ currentPassword, newPassword, confirmPassword }));
  };

  useEffect(() => {
    if (username) {
      dispatch(fetchOrdersByUsername(username));
    }
  }, [dispatch, username]);

  return (
    <Container className="profile-container">
      {isLoggedIn ? (
        <Tabs defaultActiveKey="info" id="profile-tabs" className="mb-3 profile-tabs">
          <Tab eventKey="info" title="Info">
            <Card className="profile-card">
              <Card.Body>
                <h4 className="card-title">User Information</h4>
                <ListGroup variant="flush">
                  <ListGroup.Item><strong>Username:</strong> {username}</ListGroup.Item>
                  <ListGroup.Item><strong>Name:</strong> {name}</ListGroup.Item>
                  <ListGroup.Item><strong>Email:</strong> {email}</ListGroup.Item>
                  <ListGroup.Item><strong>Phone:</strong> {phone}</ListGroup.Item>
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
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </Form.Group>
                  <Button variant="secondary" type="submit" className="mt-3 button-secondary">
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
                {ordersLoading ? (
                  <Spinner animation="border" />
                ) : ordersError ? (
                  <Alert variant="danger">{ordersError}</Alert>
                ) : (
                  <ListGroup variant="flush">
                    {orders.data.length > 0 ? (
                      orders.data.map((order) => (
                        <ListGroup.Item key={order.id}>
                          <strong>Order #{order.id}</strong>
                          <ul>
                            {order.attributes.products.map((product) => (
                              <li key={product.id}>
                                <strong>Name:</strong> {product.name}, <strong>Size:</strong> {product.size}, <strong>Price:</strong> ${product.price}, <strong>Quantity:</strong> {product.quantity}
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
                  <Button variant="secondary" type="submit" className="mt-3 button-secondary" disabled={loading}>
                    {loading ? <Spinner animation="border" size="sm" /> : 'Change Password'}
                  </Button>
                  {error && <Alert variant="danger" className="mt-3">{error.message}</Alert>}
                </Form>
              </Card.Body>
            </Card>
          </Tab>
        </Tabs>
      ) : (
        <Card className="profile-card">
          <Card.Body>
            <h4 className="card-title">You need to log in to use this activity</h4>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
}
