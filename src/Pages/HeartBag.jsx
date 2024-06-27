import { useContext } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FavContext } from "../Component/FavContext";
import "../styles/Header.css"; // Update the CSS file name for clarity

const HeartBag = () => {
  const { favItems, removeFromFav } = useContext(FavContext);

  return (
    <Container className="favourite">
      <Row>
        {favItems.length === 0 ? (
          <p>Your favourites list is empty.</p>
        ) : (
          favItems.map((item, index) => (
            <Col key={index} sm={12} className="mb-3">
              <Row className="favourite-item-row">
                <Col xs={4}>
                  <img
                    src={`http://localhost:1338${item.image}`}
                    alt={item.name}
                    className="favourite-item-image"
                  />
                </Col>
                <Col xs={8}>
                  <div className="favourite-item-details-wrapper">
                    <div className="favourite-item-box">
                      <p className="favourite-item-name">{item.name}</p>
                      <p className="favourite-item-details">
                        Mã: {item.id}
                      </p>
                      <p className="favourite-item-price">
                        {Number(item.price).toLocaleString()} đ
                      </p>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => removeFromFav(item.id)}
                        className="cancel"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default HeartBag;

