
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Image, Button, ListGroup,Form} from 'react-bootstrap';
import { removeFromCart, updateQuantity } from '../Redux/cartSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loadStripe } from "@stripe/stripe-js";
import axiosInstance from '../service/axiosInstance';
import { Trash } from 'iconsax-react';
import "../styles/ShoppingCart.css"

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

  const handleQuantityChange = (productId, productSize, newQuantity) => {
    dispatch(updateQuantity({ id: productId, size: productSize, quantity: newQuantity }));
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
                    <Trash size="20" color="red" variant="TwoTone" onClick={() => handleRemoveFromCart(group.id, group.size)} style={{ cursor: 'pointer' }} // Change cursor to pointer on hover
  className="trash-icon" />
                    <p className="text-truncate mb-0" style={{ maxWidth: '100%' }}>
                      <strong className="fw-normal">Size:</strong> {group.size} | Code: {group.id} <br />
                      <strong className="fw-normal"></strong> {Number(group.price).toLocaleString()}$
                    </p>
                  </div>
                  </div>
                  <div className="d-flex align-items-center">
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => handleQuantityChange(group.id, group.size, group.quantity - 1)}
                        disabled={group.quantity === 1}
                      >
                        -
                      </Button>
                      <Form.Control
                        type="number"
                        min="1"
                        value={group.quantity}
                        onChange={(e) => handleQuantityChange(group.id, group.size, parseInt(e.target.value, 10))}
                      />
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => handleQuantityChange(group.id, group.size, group.quantity + 1)}
                      >
                        +
                      </Button>
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
