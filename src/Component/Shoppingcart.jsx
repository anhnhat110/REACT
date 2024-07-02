import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Card, Image, Form, Button } from 'react-bootstrap';
import { removeFromCart } from '../Redux/cartSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const ShoppingCart = () => {
  const cartItems = useSelector(state => state.cart.cartItems);
  const dispatch = useDispatch();

  const stripePromise = loadStripe("pk_test_51PXZjgGlooLglT1mbIJgE0lFKv7HLuWU68lS275g5O2QVBbDDmhcfHFZgZTfmYLtdL2OTAcA4pgHcOXOxcKv6JYs00lwV2u8Q1");
  const [quantities, setQuantities] = useState(
    cartItems.reduce((acc, item) => {
      acc[`${item.id}-${item.size}`] = item.quantity;
      return acc;
    }, {})
  );

  const handlePayment = async () => {
    try {
      const stripe = await stripePromise;
      const res = await axios.post("http://localhost:1338/api/orders", {
        products: cartItems,
      });
      await stripe.redirectToCheckout({
        sessionId: res.data.stripeSession.id,
      });
      toast.success('Payment successful!');
    } catch (err) {
      console.error(err);
      toast.error('Error processing payment.');
    }
  };

  const handleQuantityChange = (event, productId, productSize) => {
    const { value } = event.target;
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [`${productId}-${productSize}`]: parseInt(value, 10)
    }));
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.price * quantities[`${item.id}-${item.size}`]);
    }, 0);
  };

  const handleRemoveFromCart = (productId, productSize) => {
    dispatch(removeFromCart({ id: productId, size: productSize }));
    toast.error('Removed from cart');
  };

  return (
    <Container className="p-0">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <h1 className="shopping-cart-title fs-4">Shopping Cart</h1>
      {cartItems.map(item => (
        <Card className="mb-3" key={`${item.id}-${item.size}`}>
          <Row className="g-0">
            <Col md={4}>
              <Image src={`http://localhost:1338${item.image}`} alt={item.name} fluid className="cart-image" />
            </Col>
            <Col md={8}>
              <Card.Body>
                <Card.Title className="fs-5">{item.name}</Card.Title>
                <Card.Text className="text-truncate" style={{ maxWidth: '100%' }}>
                  <strong className="fw-normal">Size:</strong> {item.size}<br />
                  <strong className="fw-normal">Code:</strong> {item.id}<br />
                  <strong className="fw-normal">Price:</strong> {Number(item.price).toLocaleString()} $
                </Card.Text>
                <Form.Group controlId={`quantity-${item.id}-${item.size}`} className="mb-3">
                  <Form.Label className="fw-normal">Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    min="1"
                    value={quantities[`${item.id}-${item.size}`]}
                    onChange={(e) => handleQuantityChange(e, item.id, item.size)}
                  />
                </Form.Group>
                <Button variant="danger" onClick={() => handleRemoveFromCart(item.id, item.size)}>Remove</Button>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      ))}
      <Row className="mt-3">
        <Col className="text-end"><strong className="fw-normal">Total:</strong></Col>
        <Col className="text-start"><strong className="fw-normal">{calculateTotalPrice().toLocaleString()} $</strong></Col>
      </Row>
      <Row>
        <Col className="text-right">
          <Button
            variant="primary"
            size="lg"
            className="button-checkout custom-checkout-btn"
            onClick={handlePayment}
          >
            Checkout
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ShoppingCart;
