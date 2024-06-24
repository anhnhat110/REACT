import { useContext } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { CartContext } from "../Component/CartContext";
import "../styles/Body.css";

const ShoppingCart = () => {
  const { cartItems, removeFromCart, updatedCart } = useContext(CartContext);

  const handleQuantityChange = (id, size, quantity) => {
    updatedCart(id, size, quantity);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <Container className="cart">
      <h1>Shopping Cart</h1>
      <Row>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartItems.map((item, index) => (
            <Col key={index} sm={12} className="mb-3">
              <Row className="align-items-center">
                <Col xs={2}>
                  <img
                    src={`http://localhost:1338${item.image}`}
                    alt={item.name}
                    style={{ width: "100%" }}
                  />
                </Col>
                <Col xs={4}>
                  <p>{item.name}</p>
                  <p>Size: {item.size}</p>
                </Col>
                <Col xs={3}>
                  <div className="quantity-controls">
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => handleQuantityChange(item.id, item.size, item.quantity - 1)}
                      disabled={item.quantity === 1}
                    >
                      -
                    </Button>
                    <span className="quantity">{item.quantity}</span>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => handleQuantityChange(item.id, item.size, item.quantity + 1)}
                    >
                      +
                    </Button>
                  </div>
                </Col>
                <Col xs={2} className="text-right">
                  <p>{item.price * item.quantity} VND</p>
                </Col>
                <Col xs={1} className="text-right">
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => removeFromCart(item.id, item.size)}
                  >
                    X
                  </Button>
                </Col>
              </Row>
            </Col>
          ))
        )}
      </Row>
      {cartItems.length > 0 && (
        <>
          <Row className="mt-3">
            <Col className="text-right">
              <h5>Total: {getTotalPrice()} VND</h5>
            </Col>
          </Row>
          <Row>
            <Col className="text-right">
              <Button variant="secondary" as={NavLink} to="/home" size="sm" className="button-shopping">
                Continue to shopping
              </Button>
              <Button variant="primary" as={NavLink} to="/checkout" size="sm" className="button-checkout">
                Proceed to Checkout
              </Button>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default ShoppingCart;
