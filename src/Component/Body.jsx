import "../styles/Body.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Heart } from "iconsax-react";

export default function Body({ API, title, collection }) {
  const [data, setData] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    axios.get(API).then((response) => {
      setData(response.data.data);
    });
  }, [API]);

  const handleShowMore = () => {
    setVisibleCount(visibleCount + 8);
  };

  return (
    <Container>
      <h3 className="title">{collection}</h3>
      <h5 className="type">{title}</h5>
      <Row className="products">
        {data.slice(0, visibleCount).map((d, i) => (
          <Col key={i} sm={6} md={3} className="product-card">
            {d.attributes.image && d.attributes.image.data.length > 0 && (
              <img
                className="product-image"
                src={`http://localhost:1338${d.attributes.image.data[0].attributes.url}`}
                alt={d.attributes.image.data[0].attributes.name}
              />
            )}
            <Button
              className="heart-button"
              variant="light"
              size="sm"
              // onClick={() => HandlerLiked(d.id)}
            >
              <Heart
                size="20"
                // color={likedProducts[d.id] ? "red" : "black"}
                variant="Bold"
              />
            </Button>
            <div className="product-info">
              <div className="name">{d.attributes.name}</div>
              <div>Price: {Number(d.attributes.price).toLocaleString()} VND</div>
            </div>
          </Col>
        ))}
      </Row>
      <div className="loading">{visibleCount < data.length && (
        <Button variant="secondary" onClick={handleShowMore} className="show-more-button">
          See more 
        </Button>)}</div>   
    </Container>
  );
}
