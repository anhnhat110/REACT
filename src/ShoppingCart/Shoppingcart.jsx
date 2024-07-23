import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Image, ListGroup, Form } from "react-bootstrap";
import { removeFromCart, updateQuantity } from "../Redux/cartSlice";
import { loadStripe } from "@stripe/stripe-js";
import axiosInstance from "../service/axiosInstance";
import { Trash } from "iconsax-react";
import "../styles/ShoppingCart.css";

const ShoppingCart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

  const handlePayment = async () => {
    try {
      const stripe = await stripePromise;
      const res = await axiosInstance.post("/orders", {
        products: cartItems,
        username: localStorage.getItem('username')
      });
      await stripe.redirectToCheckout({
        sessionId: res.data.stripeSession.id,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleQuantityChange = (productId, productSize, newQuantity) => {
    dispatch(
      updateQuantity({
        id: productId,
        size: productSize,
        quantity: newQuantity,
      })
    );
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handleRemoveFromCart = (productId, productSize) => {
    dispatch(removeFromCart({ id: productId, size: productSize }));
  };

  return (
    <Container className="p-0">
      <div className="shopping-cart">
        <h1 className="shopping-cart-title fs-4">Shopping Cart</h1>
        <ListGroup variant="flush">
          {cartItems.map((item) => (
            <ListGroup.Item key={`${item.id}-${item.size}`} className="mb-3">
              <Row className="g-0 align-items-center">
                <Col xs={4} md={4}>
                  <Image
                    src={`http://localhost:1338${item.image}`}
                    alt={item.name}
                    fluid
                    className="cart-image"
                  />
                </Col>
                <Col xs={4} md={6}>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="fs-5">{item.name}</h6>
                      <p
                        className="text-truncate mb-0"
                        style={{ maxWidth: "100%" }}
                      >
                        <strong className="fw-normal">Size:</strong> {item.size}{" "}
                        | Code: {item.id} <br />
                        {Number(item.price).toLocaleString()}$
                      </p>
                    </div>
                  </div>
                </Col>
                <Col xs={4} md={2}>
                  <Trash
                    size="20"
                    color="red"
                    variant="Bold"
                    onClick={() => handleRemoveFromCart(item.id, item.size)}
                    style={{ cursor: "pointer" }}
                    className="trash-icon"
                  />

                  <div className="d-flex align-items-center justify-content-md-end">
                    <Form.Control
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(
                          item.id,
                          item.size,
                          parseInt(e.target.value, 10)
                        )
                      }
                      className="me-2"
                    />
                  </div>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
        <Row className="mt-3">
          <Col className="text-end">
            <strong className="fw-normal">
              <h5>Total: {calculateTotalPrice().toLocaleString()}$</h5>
            </strong>
          </Col>
        </Row>
        <Row>
          <Col className="text-right">
            <button
              size="lg"
              className="custom-checkout-btn"
              onClick={handlePayment}
            >
              Checkout
            </button>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default ShoppingCart;
