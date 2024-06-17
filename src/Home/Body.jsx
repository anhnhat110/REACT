import "../styles/Body.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Container,Row,Col } from "react-bootstrap";
export default function Body() {
  const [data, setData] = useState([]);
  const [dataWomen,setDataWomen] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:1338/api/men?populate=*").then(
      (response) => setData(response.data.data) // Log the data to console
    );
  }, []);
  useEffect(() => {
    axios.get("http://localhost:1338/api/women?populate=*").then(
      (response) => setDataWomen(response.data.data) // Log the data to console
    );
  }, []);
  return (
    <Container>
    <h3 className="title">All Products</h3>
    <h5 className="type">For men</h5>
    <Row className="men">
      {data.map((d, i) => (
        <Col key={i} sm={6} md={3} className="product-card">
          {d.attributes.image && d.attributes.image.data.length > 0 && (
            <img className="product-image"
              src={`http://localhost:1338${d.attributes.image.data[0].attributes.url}`}
              alt={d.attributes.image.data[0].attributes.name}
            />
          )}
          <div className="product-info">
              <div className="name">{d.attributes.name}</div>
              <div>{d.attributes.price}</div>
            </div>
        </Col>
      ))}
    </Row>
    <h5 className="type">For women</h5>
    <Row className="men">
      {dataWomen.map((d, i) => (
        <Col key={i} sm={6} md={3} className="product-card">
          {d.attributes.image && d.attributes.image.data.length > 0 && (
            <img className="product-image"
              src={`http://localhost:1338${d.attributes.image.data[0].attributes.url}`}
              alt={d.attributes.image.data[0].attributes.name}
            />
          )}
          <div className="product-info">
          <div className="name">{d.attributes.name}</div>
              <div>{d.attributes.price}</div>
            </div>
        </Col>
      ))}
    </Row>
    
  </Container>
);
}

