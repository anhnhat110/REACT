import { useEffect, useState } from "react";
import { useLocation,Link } from "react-router-dom";
import axios from "axios";
import { Row, Col, Container } from "react-bootstrap";
 // Import các component Bootstrap cần thiết

const SearchResults = () => {
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();
  
  const query = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:1338/api/products", {
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

  return (
    <Container>
      <h3>Search Results: {searchResults.length} product </h3>
      <Row className="products">
        {searchResults.map((d) => (
          <Col key={d.id} sm={6} md={3} className="product-card">
          <Link
              to={`/products/${d.id}`}
              onClick={() => window.scrollTo(0, 0)} // Scroll lên đầu khi click
            >
            <img
              className="product-image"
              src={`http://localhost:1338${d.attributes.image.data[0].attributes.url}`}
              alt={d.attributes.image.data[0].attributes.name}
            />
            </Link>
            <div className="product-info">
              <div className="name">{d.attributes.name}</div>
              <div>
                Price: {Number(d.attributes.price).toLocaleString()} VND
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default SearchResults;
