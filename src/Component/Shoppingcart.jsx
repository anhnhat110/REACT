import { useContext } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { CartContext } from "../Component/CartContext";
import "../styles/Header.css"; // Update the CSS file name for clarity

const ShoppingCart = () => {
  const { cartItems, removeFromCart, updatedCart } = useContext(CartContext);

  const handleQuantityChange = (id, size, quantity) => {
    updatedCart(id, size, quantity);
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <Container className="cart">
      <Row>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartItems.map((item, index) => (
            <Col key={index} sm={12} className="mb-3">
              <Row className="cart-item-row">
                <Col xs={4}>
                  <img
                    src={`http://localhost:1338${item.image}`}
                    alt={item.name}
                    className="cart-item-image"
                  />
                </Col>
                <Col xs={8}>
                  <div className="cart-item-details-wrapper">
                    <div className="cart-item-box">
                      <p className="cart-item-name">{item.name}</p>
                      <p className="cart-item-details">
                        Mã: {item.id} | Size: {item.size}
                      </p>
                      <p className="cart-item-price">
                        {(item.price * item.quantity).toLocaleString()} đ
                      </p>
                      <div className="quantity-controls">
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          onClick={() =>
                            handleQuantityChange(
                              item.id,
                              item.size,
                              item.quantity - 1
                            )
                          }
                          disabled={item.quantity === 1}
                        >
                          -
                        </Button>
                        <span className="quantity">{item.quantity}</span>
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          onClick={() =>
                            handleQuantityChange(
                              item.id,
                              item.size,
                              item.quantity + 1
                            )
                          }
                        >
                          +
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => removeFromCart(item.id, item.size)}
                          className="cancel"
                        >
                          X
                        </Button>
                      </div>
                    </div>
                  </div>
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
              <h5 className="total-price">
                Total: {getTotalPrice().toLocaleString()} đ
              </h5>
            </Col>
          </Row>
          <Row>
            <Col className="text-right">
              <Button
                variant="primary"
                as={NavLink}
                to="/checkout"
                size="lg"
                className="button-checkout custom-checkout-btn"
              >
                Checkout
              </Button>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default ShoppingCart;
