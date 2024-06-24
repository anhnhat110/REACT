import "../styles/Body.css";
import PropTypes from 'prop-types';
import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Heart } from "iconsax-react";
import { Link } from "react-router-dom";

export default function Body({ API, title, collection, productDetailPath }) {
  const [data, setData] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    // Fetch data from API
    axios.get(API)
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [API]);

  useEffect(() => {
    // Load liked status from localStorage if available
    const savedLikes = JSON.parse(localStorage.getItem('likedProducts')) || {};
    const newData = data.map(item => ({
      ...item,
      liked: savedLikes[item.id] || false  // Set liked status from localStorage or default to false
    }));
    setData(newData);
  }, []); // Run once on mount

  const handleShowMore = () => {
    setVisibleCount(visibleCount + 8);
  };

  const handleLiked = (id) => {
    const newData = data.map(item => {
      if (item.id === id) {
        const newLiked = !item.liked;
        // Update local state
        item.liked = newLiked;
        // Update localStorage
        const savedLikes = JSON.parse(localStorage.getItem('likedProducts')) || {};
        localStorage.setItem('likedProducts', JSON.stringify({
          ...savedLikes,
          [id]: newLiked
        }));
      }
      return item;
    });
    setData(newData);
  };

  return (
    <Container>
      <h3 className="title">{collection}</h3>
      <h5 className="type">{title}</h5>
      <Row className="products">
        {data.slice(0, visibleCount).map((d, i) => (
          <Col key={i} sm={6} md={3} className="product-card">
            <Link to={`${productDetailPath}/${d.id}`}>
              {d.attributes.image && d.attributes.image.data.length > 0 && (
                <img
                  className="product-image"
                  src={`http://localhost:1338${d.attributes.image.data[0].attributes.url}`}
                  alt={d.attributes.image.data[0].attributes.name}
                />
              )}
            </Link>
            <Button onClick={() => handleLiked(d.id)} className="heart-button" variant="light" size="sm">
              <Heart size="20" variant="Bold" color={d.liked ? "red" : "black"} />
            </Button>
            <div className="product-info">
              <div className="name">{d.attributes.name}</div>
              <div>Price: {Number(d.attributes.price).toLocaleString()} VND</div>
            </div>
          </Col>
        ))}
      </Row>
      <div className="loading">
        {visibleCount < data.length && (
          <Button variant="secondary" onClick={handleShowMore} className="show-more-button">
            See more
          </Button>
        )}
      </div>
    </Container>
  );
}

Body.propTypes = {
  API: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  collection: PropTypes.string.isRequired,
  productDetailPath: PropTypes.string.isRequired,
};
