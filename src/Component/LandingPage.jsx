import { useEffect, useState, useCallback } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addToFav, removeFromFav } from "../Redux/wishlistSlice";
import { fetchProductsLimit } from "../service/productService"; // Import functions from productService
import PropTypes from "prop-types";
import LogoHeart from "../assets/LogoHeart";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();

export default function LandingPage({ title, collection, cat, limit }) {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const favItems = useSelector((state) => state.wishlist.favItems);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const fetchData = useCallback(async () => {
    try {
      const products = await fetchProductsLimit(cat, limit);
      setData(products);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [cat, limit]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
          xs={12}
          md={12}
          className="d-flex flex-column align-items-center text-center"
        >
          <h3 className="title">{collection}</h3>
          <h5 className="type">{title}</h5>
        </Col>
        <Col xs={12} md={12} className="text-md-end mt- mt-md-0"></Col>
      </Row>
      <Row className="products">
        {data.map((d) => (
          <Col key={d.id} xs={6} sm={6} md={3} className="img">
            <div className="product-card" data-aos="zoom-in-up">
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
    </Container>
  );
}

LandingPage.propTypes = {
  title: PropTypes.string.isRequired,
  cat: PropTypes.string.isRequired,
  limit: PropTypes.number.isRequired,
  
};
