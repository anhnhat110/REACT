import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axiosInstance from "../service/axiosInstance"; // Import axios instance đã tạo
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Row, Col, Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addToFav, removeFromFav } from "../Redux/wishlistSlice";
import LogoHeart from "../assets/LogoHeart";
import { SearchStatus } from "iconsax-react";

// Import các component Bootstrap cần thiết

const SearchResults = () => {
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();
  const dispatch = useDispatch();
  const favItems = useSelector((state) => state.wishlist.favItems);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const query = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get("/products", {
          params: {
            populate: "*",
            "filters[name][$contains]": query,
          },
        });
        setSearchResults(response.data.data);
      } catch (error) {
        console.error("Error fetching the products:", error);
      }
    };

    if (query) {
      fetchProducts();
    }
  }, [query]);

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
    <Container className="search-container">
      <div className="search-result">
        <h3>
          Search Results: {searchResults.length} product{" "}
          <SearchStatus size="24" color="black" />
        </h3>
        <Row className="products">
          {searchResults.map((d) => (
            <Col key={d.id}  xs={6} sm={6} md={3} className="img">
              <div className="product-card">
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
                  <a className="card-button">More info</a>
                </Link>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );
};

export default SearchResults;
