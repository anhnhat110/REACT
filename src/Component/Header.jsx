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
} from "react-bootstrap";
import "../styles/Header.css";
import maverickLogo from "../assets/Maverick.png";
import { NavLink, useNavigate } from "react-router-dom";
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
  const [query, setQuery] = useState("");

  const target = useRef(null);
//chuyenhuong
  const navigate = useNavigate();
//hieu ung cho overplay - Shopping Cart
  const handleMouseEnter = () => {
    setShowOverlay(true);
  };

  const handleMouseLeave = () => {
    setShowOverlay(false);
  };
//handleEvent Onclick - Search
  const searchProducts = async () => {
    try {
      navigate(`/search?query=${query}`);
    } catch (error) {
      console.error("Error navigating to search:", error);
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      searchProducts();
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

              <Form className="search">
                <Row>
                  <Col xs="auto">
                    <Form.Control
                      type="text"
                      placeholder="Search"
                      style={{ width: "300px" }}
                      className="search-input mr-sm-2"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      onKeyPress={handleKeyPress}
                    />
                  </Col>
                  <Col xs="auto">
                    <Button variant="secondary" onClick={searchProducts}>
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
{/* Overplay - Shopping Cart */}
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
          style={{ width: "400px", maxWidth: "400px" }}
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
    </>
  );
}