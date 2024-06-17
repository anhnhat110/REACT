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
import {
  faUser,
  faStore,
  faShoppingCart,
  faShoppingBag,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import maverickLogo from "../assets/Maverick.png";
import Slide from "./Slide";
export function Header() {
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">
            <img src={maverickLogo} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link className="title" href="home">Home</Nav.Link>
              <Nav.Link className="title" href="men">Men</Nav.Link>
              <Nav.Link className="title" href="women">Women</Nav.Link>
              <Nav.Link className="title" href="boys">Boys</Nav.Link>
              <Nav.Link className="title" href="girls">Girls</Nav.Link>
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
                      <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </Button>
                  </Col>
                </Row>
              </Form>
              <Nav.Link href="user" className="icon">
                <FontAwesomeIcon icon={faUser} />
              </Nav.Link>
              <Nav.Link href="store" className="icon">
                <FontAwesomeIcon icon={faStore} />
              </Nav.Link>
              <Nav.Link href="shoppingbag" className="icon">
                <FontAwesomeIcon icon={faShoppingBag} />
              </Nav.Link>
              <Nav.Link href="shoppingcart" className="icon">
                <FontAwesomeIcon icon={faShoppingCart} />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* <Image className="bg1" src={background1} fluid /> */}
      <Slide />
    </>
  );
}
