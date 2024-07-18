import { Row, Container, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { fetchOrderLatest } from "../service/ordersService";
import { useEffect, useState } from "react";
import React from "react";
import { TickCircle } from "iconsax-react";
import "../styles/OrderSuccess.css";

export default function OrderSuccess() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const latestOrder = await fetchOrderLatest();
        setData(latestOrder);
        setLoading(false);
      } catch {
        setError(error);
        setLoading(false);
      }
    };
    fetchOrder();
  });
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error message : {error.message}</p>;
  }
  const totalPrice = data.products.reduce(
    (sum, product) => sum + parseFloat(product.price) * product.quantity,
    0
  );
  return (
    <>
      <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
        <Container className="py-5 h-100">
          <Row className="justify-content-center align-items-center h-100">
            <Col lg="8" xl="6">
              <Card className="border-top border-bottom border-3 border-color-custom">
                <Card.Body className="p-5">
                  <h2 className="lead fw-bold mb-5" style={{ color: "black" }}>
                    Purchase Receipt{" "}
                    <TickCircle size="32" color="#157347" variant="Bold" />
                  </h2>
                  <Row>
                    <Col className="mb-3">
                      <p className="small text-muted mb-1">Date</p>
                      <p>{new Date(data.createdAt).toLocaleString()}</p>
                    </Col>
                    <Col className="mb-3">
                      <p className="small text-muted mb-1">Order No.</p>
                      <p>{data.id}</p>
                    </Col>
                  </Row>
                  <div
                    className="mx-n5 px-4 py-3"
                    style={{ backgroundColor: "#f2f2f2" }}
                  >
                    <Row>
                      {data.products.map((product, index) => (
                        <React.Fragment key={index}>
                          <Col md="3" lg="4">
                            <p>{product.name}</p>
                          </Col>
                          <Col md="3" lg="3">
                            <p className="mb-0">Size: {product.size}</p>
                          </Col>
                          <Col md="3" lg="3">
                            <p className="mb-0">Quantity: {product.quantity}</p>
                          </Col>
                          <Col md="3" lg="2">
                            <p>{product.price}$</p>
                          </Col>
                        </React.Fragment>
                      ))}
                    </Row>
                    <Row></Row>
                  </div>
                  <Row className="my-4">
                    <Col md="4" className="offset-md-8 col-lg-4 offset-lg-9">
                      <p className="lead fw-bold mb-0">TOTAL: {totalPrice}$</p>
                    </Col>
                  </Row>
                  <Row className="d-flex justify-content-center">
                    <button
                      onClick={() => navigate("/home")}
                      className="button-back-home"
                    >
                      Back to Home
                    </button>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
