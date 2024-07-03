import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Image, Form, Button, ListGroup } from 'react-bootstrap';
import { removeFromCart } from '../Redux/cartSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loadStripe } from "@stripe/stripe-js";
import axiosInstance from '../service/axiosInstance';

const ShoppingCart = () => {
  const cartItems = useSelector(state => state.cart.cartItems);
  const dispatch = useDispatch();

  const stripePromise = loadStripe("pk_test_51PXZjgGlooLglT1mbIJgE0lFKv7HLuWU68lS275g5O2QVBbDDmhcfHFZgZTfmYLtdL2OTAcA4pgHcOXOxcKv6JYs00lwV2u8Q1");

  const handlePayment = async () => {
    try {
      const stripe = await stripePromise;
      const res = await axiosInstance.post("/orders", {
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
    // Ensure the new quantity is a valid positive integer
    const newQuantity = parseInt(value, 10);
    if (isNaN(newQuantity) || newQuantity < 1) {
      return; // Ignore invalid input
    }
    
    const updatedCartItems = cartItems.map(item => {
      if (item.id === productId && item.size === productSize) {
        return {
          ...item,
          quantity: newQuantity
        };
      }
      return item;
    });
    dispatch({ type: 'cart/updateCart', payload: updatedCartItems });
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  };

  const handleRemoveFromCart = (productId, productSize) => {
    dispatch(removeFromCart({ id: productId, size: productSize }));
    toast.error('Removed from cart');
  };

  const groupedCartItems = groupCartItems(cartItems);

  return (
    <Container className="p-0">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <h1 className="shopping-cart-title fs-4">Shopping Cart</h1>
      <ListGroup variant="flush">
        {groupedCartItems.map(group => (
          <ListGroup.Item key={`${group.id}-${group.size}`} className="mb-3">
            <Row className="g-0">
              <Col md={4}>
                <Image src={`http://localhost:1338${group.image}`} alt={group.name} fluid className="cart-image" />
              </Col>
              <Col md={8}>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h5 className="fs-5">{group.name}</h5>
                    <p className="text-truncate mb-0" style={{ maxWidth: '100%' }}>
                      <strong className="fw-normal">Size:</strong> {group.size}<br />
                      <strong className="fw-normal">Code:</strong> {group.id}<br />
                      <strong className="fw-normal">Price:</strong> {Number(group.price).toLocaleString()}$
                    </p>
                  </div>
                  <div className="text-end">
                    <Form.Group controlId={`quantity-${group.id}-${group.size}`} className="mb-3">
                      <Form.Label className="fw-normal">Quantity</Form.Label>
                      <Form.Control
                        type="number"
                        min="1"
                        value={group.quantity}
                        onChange={(e) => handleQuantityChange(e, group.id, group.size)}
                      />
                    </Form.Group>
                    <Button variant="danger" onClick={() => handleRemoveFromCart(group.id, group.size)}>Remove</Button>
                  </div>
                </div>
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Row className="mt-3">
        <Col className="text-end"><strong className="fw-normal"><h5>Total: {calculateTotalPrice().toLocaleString()}$</h5></strong></Col>
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

// Function to group cart items by id and size, summing up quantities
const groupCartItems = (cartItems) => {
  const groupedItems = cartItems.reduce((groups, item) => {
    const key = `${item.id}-${item.size}`;
    if (!groups[key]) {
      groups[key] = {
        id: item.id,
        name: item.name,
        image: item.image,
        size: item.size,
        price: item.price,
        quantity: item.quantity
      };
    } else {
      groups[key].quantity += item.quantity;
    }
    return groups;
  }, {});

  return Object.values(groupedItems);
};

export default ShoppingCart;
