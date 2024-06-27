// SearchResults.jsx
import React, { useEffect, useState } from "react";
import { Card, Row, Col, Container } from "react-bootstrap"; // Import các component Bootstrap cần thiết

const SearchResults = () => {
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Lấy kết quả tìm kiếm từ sessionStorage
    const storedResults = JSON.parse(sessionStorage.getItem("searchResults"));
    if (storedResults) {
      // Lưu kết quả tìm kiếm vào state
      setSearchResults(storedResults);
    }
  }, []);

  return (
    <Container>
      <h1>Search Results</h1>
      <Row className="products">
        {searchResults.map((d) => (
          <Col key={d.id} sm={6} md={3} className="product-card">
            <img
              className="product-image"
              src={`http://localhost:1338${d.attributes.image.data[0].attributes.url}`}
            />
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
