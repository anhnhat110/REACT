import { useState, useRef } from "react";
import {
  Container,
  Navbar,
  Nav,
  Form,
  Button,
  Overlay,
  Popover,
  NavItem,
} from "react-bootstrap";
import "../styles/Header.css";
import maverickLogo from "../assets/Maverick.png";
import search from "../assets/search.png";
import { NavLink, useNavigate } from "react-router-dom";
import LogOut from "../AuthComponent/LogOut";
import SignUp from "../AuthComponent/SignUp";
import { useSelector } from "react-redux";
import {
  ShoppingCart as CartIcon,
  HeartTick,
  User,
} from "iconsax-react";
import ShoppingCart from "../ShoppingCart/Shoppingcart"; // Assuming ShoppingCart component displays cart items
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();

export function Header() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [showOverlay, setShowOverlay] = useState(false);
  const [query, setQuery] = useState("");

  const target = useRef(null);

  const navigate = useNavigate();

  const handleMouseEnter = () => {
    setShowOverlay(true);
  };

  const handleMouseLeave = () => {
    setShowOverlay(false);
  };

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
      <div className="header-container">
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container>
            <Navbar.Brand>
              <NavLink to="/">
                <img
                  src={maverickLogo}
                  alt="Maverick Logo"
                  className="img-fluid"
                />
              </NavLink>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <NavItem></NavItem>
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
              </Nav>
              <Form className="d-flex justify-content-center">
                <Form.Control
                  xs={6}
                  type="text"
                  placeholder="Search"
                  className="me-1"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <button onClick={searchProducts} >
                  <img src={search} alt="search" className="search-icon" />
                </button>
              </Form>
              <div className="d-flex align-items-center">
                <Button
                  variant="light"
                  as={NavLink}
                  to="/profile"
                  className="icon"
                >
                  <User size="18" color="Black" variant="Bold" />
                </Button>
                <Button
                  variant="light"
                  as={NavLink}
                  to="/wishlist"
                  className="icon"
                >
                  <HeartTick size="18" color="Black" variant="Bold" />
                </Button>
                <Button
                  variant="light"
                  ref={target}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  className="position-relative icon"
                >
                  {cartItems.length > 0 && (
                    <span className="shopping-item">{cartItems.length}</span>
                  )}
                  <CartIcon size="18" color="Black" variant="Bold" />
                </Button>
                <div className="icon-logout">
                  <NavLink to="/login">
                    {isLoggedIn ? <LogOut /> : <SignUp />}
                  </NavLink>
                </div>
              </div>
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
          >
            <Popover.Header as="h3" className="popover-header">
              Shopping Cart
            </Popover.Header>
            <Popover.Body className="popover-body">
              <ShoppingCart />
            </Popover.Body>
          </Popover>
        </Overlay>
      </div>
    </>
  );
}
