import {
  Container,
  Navbar,
  Nav,
  Form,
  Row,
  Col,
  Button,
  // Image,
} from "react-bootstrap";
import "../styles/Header.css";
import maverickLogo from "../assets/Maverick.png";
import { NavLink } from "react-router-dom";
import {
  User,
  ShoppingCart,
  Shop,
  SearchNormal,
  HeartTick,
} from "iconsax-react";

export function Header() {
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>
            <img src={maverickLogo} />
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
              <Nav.Link as={NavLink} to="/user" className="icon">
                <User size="18" color="Black" variant="Bold" />
              </Nav.Link>
              <Nav.Link as={NavLink} to="/store" className="icon">
                <Shop size="18" color="Black" variant="Bold" />
              </Nav.Link>
              <Nav.Link as={NavLink} to="/heartbag" className="icon">
                <HeartTick size="18" color="Black" variant="Bold" />
              </Nav.Link>
              <Nav.Link as={NavLink} to="/shoppingcart" className="icon">
                <ShoppingCart size="18" color="Black" variant="Bold" />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* <Image className="bg1" src={background1} fluid /> */}
    </>
  );
}
