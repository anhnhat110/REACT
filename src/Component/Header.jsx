import { useState, useContext, useRef } from "react";
import {
  Container,
  Navbar,
  Nav,
  Form,
  Row,
  Col,
  Button,
  Overlay,
  Popover,
  Image,
} from "react-bootstrap";
import "../styles/Header.css";
import maverickLogo from "../assets/Maverick.png";
import { NavLink } from "react-router-dom";
import { CartContext } from "../Component/CartContext";
import {
  ShoppingCart as CartIcon,
  SearchNormal,
  HeartTick,
  User,
  Shop,
  ArrowCircleRight,
} from "iconsax-react";
import ShoppingCart from "./Shoppingcart"; // Assuming ShoppingCart component displays cart items

export function Header() {
  const { cartItems } = useContext(CartContext);
  const [showOverlay, setShowOverlay] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const target = useRef(null);

  const handleMouseEnter = () => {
    setShowOverlay(true);
  };

  const handleMouseLeave = () => {
    setShowOverlay(false);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    if (searchQuery.trim() === "") return;

    try {
      const response = await fetch(
        `http://localhost:1338/products?_q=${searchQuery}`
      );
      const results = await response.json();
      setSearchResults(results);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>
            <img src={maverickLogo} alt="Maverick Logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/home" className="nav-button">
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="/men" className="nav-button">
                Men
              </Nav.Link>
              <Nav.Link as={NavLink} to="/women" className="nav-button">
                Women
              </Nav.Link>
              <Nav.Link as={NavLink} to="/boys" className="nav-button">
                Boys
              </Nav.Link>
              <Nav.Link as={NavLink} to="/girls" className="nav-button">
                Girls
              </Nav.Link>

              <Form className="search" onSubmit={handleSearchSubmit}>
                <Row>
                  <Col xs="auto">
                    <Form.Control
                      type="text"
                      placeholder="Search"
                      style={{ width: "300px" }}
                      className="search-input mr-sm-2"
                      value={searchQuery}
                      onChange={handleSearchChange}
                    />
                  </Col>
                  <Col xs="auto">
                    <Button variant="secondary" type="submit">
                      <SearchNormal size="18" color="white" variant="Outline" />
                    </Button>
                  </Col>
                </Row>
              </Form>
              <Button variant="light" as={NavLink} to="/login" className="icon">
                <User size="18" color="Black" variant="Bold" />
              </Button>
              <Button variant="light" as={NavLink} to="/checkout">
                <Shop size="18" color="Black" variant="Bold" />
              </Button>
              <Button variant="light" as={NavLink} to="/heartbag">
                <HeartTick size="18" color="Black" variant="Bold" />
              </Button>
              <Button
                variant="light"
                ref={target}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="position-relative"
              >
                <span className="shopping-item">{cartItems.length}</span>
                <CartIcon size="18" color="Black" variant="Bold" />
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Overlay
        show={showOverlay}
        target={target.current}
        placement="bottom"
        containerPadding={20}
        className="custom-overlay"
      >
        <Popover
          id="popover-contained"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{ width: '400px', maxWidth: '400px' }}
        >
          <Popover.Header as="h3" className="popover-header">
            Shopping Cart
              <ArrowCircleRight size="20" color="Black" className="arrow" />
          </Popover.Header>
          <Popover.Body className="popover-body">
            <ShoppingCart />
          </Popover.Body>
        </Popover>
      </Overlay>
      {searchResults.length > 0 && (
        <Container className="search-results">
          <h2>Search Results</h2>
          <Row>
            {searchResults.map((result) => (
              <Col key={result.id} sm={4}>
                <div className="search-result-item">
                  <Image src={`http://localhost:1338${result.image}`} thumbnail />
                  <h5>{result.name}</h5>
                  <p>{result.description}</p>
                  <p>{result.price.toLocaleString()} đ</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </>
  );
}
