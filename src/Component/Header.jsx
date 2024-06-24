import { useState, useContext } from "react";
import {
  Container,
  Navbar,
  Nav,
  Form,
  Row,
  Col,
  Button,
  Offcanvas,
} from "react-bootstrap";
import "../styles/Header.css";
import maverickLogo from "../assets/Maverick.png";
import { NavLink } from "react-router-dom";
import { CartContext } from "../Component/CartContext";
import { ShoppingCart as CartIcon,SearchNormal,HeartTick,User,Shop } from "iconsax-react"; // Assuming correct import for iconsax-react
import ShoppingCart from "./Shoppingcart";

export function Header() {
  const [show, setShow] = useState(false);
  const { cartItems } = useContext(CartContext);

  const handleClose = () => {
    setShow(false);
  };

  const toggleShow = () => {
    setShow((s) => !s);
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
                    />
                  </Col>
                  <Col xs="auto">
                    <Button variant="secondary">
                      <SearchNormal size="18" color="white" variant="Outline" />
                    </Button>
                  </Col>
                </Row>
              </Form>
              <Button variant="light" as={NavLink} to="/login" className="icon">
                <User size="18" color="Black" variant="Bold" />
              </Button>
              <Button variant="light" as={NavLink} to="/store">
                <Shop size="18" color="Black" variant="Bold" />
              </Button>
              <Button variant="light" as={NavLink} to="/heartbag">
                <HeartTick size="18" color="Black" variant="Bold" />
              </Button>
              <Button
                variant="light"
                onClick={toggleShow}
                className="position-relative"
              >
                <span className="shopping-item">{cartItems.length}</span>
                <CartIcon size="18" color="Black" variant="Bold" />
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Offcanvas
        show={show}
        onHide={handleClose}
        scroll={true}
        backdrop={true}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ShoppingCart/>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
