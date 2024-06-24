import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import "../styles/Body.css";
import { CartContext } from "../Component/CartContext";

const ProductDetail = ({ url }) => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:1338/api/${url}/${id}?populate=*`)
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching the product details:", error);
      });
  }, [id, url]);

  if (!data) {
    return <div>Loading...</div>;
  }

  const { attributes } = data;

  const handleAddToCart = () => {
    if (selectedSize) {
      addToCart({
        id,
        name: attributes.name,
        price: attributes.price,
        size: selectedSize,
        quantity: parseInt(quantity, 10),
        image: attributes.image.data[0].attributes.url,
      });
    
    } else {
      alert("Please select a size.");
    }
  };

  return (
    <Container>
      <Row className="products">
        <Col sm={6} md={3} className="product-card">
          {attributes.image && attributes.image.data.length > 0 && (
            <img
              className="product-image"
              src={`http://localhost:1338${attributes.image.data[0].attributes.url}`}
              alt={attributes.image.data[0].attributes.name}
            />
          )}
        </Col>
        <Col md={6} className="detail">
          <h1>{attributes.name}</h1>
          <p>{attributes.description}</p>
          <h6>Price: {Number(attributes.price).toLocaleString()} VND</h6>
          <div>
            {attributes.size.map((size) => (
              <div
                className="button-size"
                key={size.id}
                onClick={() => setSelectedSize(size.name)}
              >
                <Button
                  variant={selectedSize === size.name ? "dark" : "outline-dark"}
                >
                  {size.name}
                </Button>
              </div>
            ))}
          </div>
          <Form.Group controlId="quantity" className="my-3">
            <Form.Label>Quantity</Form.Label>
            <Form.Select
              className="form-select-sm"
              onChange={(e) => setQuantity(e.target.value)}
              value={quantity}
              style={{ width: "auto", display: "inline-block" }}
            >
              {Array.from({ length: 10 }, (_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Button
            variant="secondary"
            className="button-add-to-cart"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
          <p>
            Call to <b>Hotline</b> To Faster Order
          </p>
          <p>Call to Hotline: 0363652758</p>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;
