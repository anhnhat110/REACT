import { useEffect, useState, useCallback } from "react";
import { Container, Row, Col } from "react-bootstrap";

import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addToFav, removeFromFav } from "../Redux/wishlistSlice";
import { fetchProducts } from "../service/productService"; // Import functions from productService
import PropTypes from "prop-types";
import LogoHeart from "../assets/LogoHeart";
import Sort from "../Sort/Sort";
import AOS from "aos";
import "aos/dist/aos.css";
import Filter from "../Filtering/Filter";
import ScrollToTop from "../Scroll/ScrollToTop";
AOS.init();

export default function Body({ title, collection, cat }) {
  const [data, setData] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [sort, setSort] = useState(null);
  const [filters, setFilters] = useState(null);
  const dispatch = useDispatch();
  const favItems = useSelector((state) => state.wishlist.favItems);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const fetchData = useCallback(async () => {
    {
      const products = await fetchProducts(cat, sort, filters);
      setData(products);
    }
  }, [cat, sort, filters]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleShowMore = () => {
    setVisibleCount(visibleCount + 8);
  };

  const handleLiked = (item) => {
    if (!isLoggedIn) {
      toast.error("You need to log in");
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
      dispatch(removeFromFav(item.id));
    } else {
      dispatch(addToFav(product));
    }
  };

  return (
    <Container>
      <Row className="align-items-center">
        <Col
          xs={4}
          md={12}
          className="d-flex flex-column align-items-center text-center"
        >
          <h3 className="title">{collection}</h3>
          <h5 className="type">{title}</h5>
        </Col>
        <Col
          xs={6}
          md={12}
          className="d-flex justify-content-between align-items-center mt-0 mt-md-0 mb-4"
        >
          <Filter onFilterChange={setFilters} />
          <Sort setSort={setSort} />
        </Col>
      </Row>
      <Row className="products">
        {data.slice(0, visibleCount).map((d) => (
          <Col key={d.id} xs={6} sm={6} md={3} className="img">
            <div className="product-card" data-aos="zoom-in">
              <div className="product-card-detail">
                {d.attributes.image && d.attributes.image.data.length > 0 && (
                  <img
                    className="product-image"
                    src={`http://localhost:1338${d.attributes.image.data[0].attributes.url}`}
                    alt={d.attributes.image.data[0].attributes.name}
                  />
                )}

                <LogoHeart
                  className="heart-button-detail"
                  isFav={favItems.some((favItem) => favItem.id === d.id)}
                  onClick={() => handleLiked(d)}
                ></LogoHeart>
                <div className="product-info">
                  <div className="name">{d.attributes.name}</div>
                  <div>
                    Price: {Number(d.attributes.price).toLocaleString()}$
                  </div>
                </div>
              </div>
              <Link
                to={`/products/${d.id}`}
                onClick={() => window.scrollTo(0, 0)}
              >
                <p className="card-button">More info</p>
              </Link>
            </div>
          </Col>
        ))}
      </Row>
      <div className="loading">
        {visibleCount < data.length && (
          <button className="learn-more" onClick={handleShowMore}>
            <span className="circle" aria-hidden="true">
              <span className="icon arrow"></span>
            </span>
            <span className="button-text">Show More</span>
          </button>
        )}
      </div>
      <ScrollToTop />
    </Container>
  );
}

Body.propTypes = {
  title: PropTypes.string.isRequired,
  collection: PropTypes.string.isRequired,
  cat: PropTypes.string.isRequired,
};
