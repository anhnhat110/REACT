import { useSelector } from "react-redux";
import { useEffect, useState, useContext } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Heart } from "iconsax-react";
import { Link } from "react-router-dom";
import { fetchProducts } from "../service/productService"; // Import functions from productService
import PropTypes from "prop-types";
import { FavContext } from "./FavContext";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Body({ title, collection, cat }) {
  const [data, setData] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const { favItems, addToFav, removeFromFav } = useContext(FavContext);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await fetchProducts();
        const filteredData = products.filter(
          (item) =>
            item.attributes.categories.data.some(
              (category) => category.attributes.name === cat
            )
        );
        setData(filteredData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [cat]);

  const handleShowMore = () => {
    setVisibleCount(visibleCount + 8);
  };

  const handleLiked = (item) => {
    if (!isLoggedIn) {
      toast.error("You need to log in to add items to favorites");
      return;
    }
    const isFav = favItems.some((favItem) => favItem.id === item.id);
    const product = {
      id: item.id,
      name: item.attributes.name,
      image: item.attributes.image?.data[0]?.attributes.url,
      price: item.attributes.price,
    };
    if (isFav) {
      removeFromFav(item.id);
    } else {
      addToFav(product);
    }
  };

  return (
    <Container>
      <h3 className="title">{collection}</h3>
      <h5 className="type">{title}</h5>
      <Row className="products">
        {data.slice(0, visibleCount).map((d) => (
          <Col key={d.id} sm={6} md={3} className="product-card">
            <Link
              to={`/products/${d.id}`}
              onClick={() => window.scrollTo(0, 0)}
            >
              {d.attributes.image && d.attributes.image.data.length > 0 && (
                <img
                  className="product-image"
                  src={`http://localhost:1338${d.attributes.image.data[0].attributes.url}`}
                  alt={d.attributes.image.data[0].attributes.name}
                />
              )}
            </Link>
            <Button
              onClick={() => handleLiked(d)}
              className="heart-button"
              variant="light"
              size="sm"
            >
              <Heart
                size="20"
                variant="Bold"
                color={favItems.some((favItem) => favItem.id === d.id) ? "red" : "black"}
              />
            </Button>
            <div className="product-info">
              <div className="name">{d.attributes.name}</div>
              <div>
                Price: {Number(d.attributes.price).toLocaleString()}$
              </div>
            </div>
          </Col>
        ))}
      </Row>
      <div className="loading">
        {visibleCount < data.length && (
          <Button
            variant="secondary"
            onClick={handleShowMore}
            className="show-more-button"
          >
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
  cat: PropTypes.string.isRequired,
};
