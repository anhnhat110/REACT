import { useSelector, useDispatch } from "react-redux";
import { Container, Button, Row, Col, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { removeFromFav } from "../Redux/wishlistSlice";
import { addToCart } from "../Redux/cartSlice"; // Import addToCart action
import { HeartCircle } from "iconsax-react";
import "../styles/WishList.css";

const Wishlist = () => {
  const favItems = useSelector((state) => state.wishlist.favItems);
  const dispatch = useDispatch();

  const handleRemoveFromFav = (id) => {
    dispatch(removeFromFav(id));
  };

  const handleAddToCart = (item) => {
    const product = {
      id: item.id,
      name: item.name,
      image: item.image,
      price: item.price,
      size: item.size, // Assuming size is already stored in item
      quantity: 1, // Default quantity is 1
    };
    dispatch(addToCart(product));
  };

  return (
    <Container className="wishlist-container">
      <Row>
        <HeartCircle size="40" color="Red" />
      </Row>
      <div className="top-wishlist">
        <h1 className="text-wishlist">My Wishlist</h1>
      </div>
      <ListGroup className="wishlist-list">
        {favItems.length === 0 ? (
          <Row>Your wishlist is empty</Row>
        ) : (
          favItems.map((item, index) => (
            <ListGroup.Item key={index} className="wishlist-item">
              <Row className="align-items-center">
                <Col xs={2}>
                  <img
                    src={`http://localhost:1338${item.image}`}
                    alt={item.name}
                    className="wishlist-item-image"
                  />
                </Col>
                <Col xs={7}>
                  <div className="wishlist-item-details-horizontal">
                    <p className="wishlist-item-name">{item.name}</p>
                    <p className="wishlist-item-details">ID: {item.id}</p>
                    <p className="wishlist-item-price">
                      {Number(item.price).toLocaleString()} $
                    </p>
                  </div>
                </Col>
                <Col xs={3} className="text-right">
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleRemoveFromFav(item.id)}
                    className="wishlist-item-remove"
                  >
                    Remove
                  </Button>
                  <Link
                    to={`/products/${item.id}`}
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleAddToCart(item)}
                      className="wishlist-item-add-to-cart"
                    >
                      View product
                    </Button>
                  </Link>
                </Col>
              </Row>
            </ListGroup.Item>
          ))
        )}
      </ListGroup>
    </Container>
  );
};

export default Wishlist;