import { Container, Row, Col } from "react-bootstrap";
import "../styles/Footer.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faGithub,faFacebook,faInstagram,faLinkedin} from "@fortawesome/free-brands-svg-icons"
export default function Footer() {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col md={4}>
            <h5>Vo Le Anh Nhat</h5>
            <p>Intern of Program-20</p>
            <p>TMA Innovation Park</p>
            <p>Project: UI of Maverick</p>
          </Col>
          <Col md={4}>
            <h5>More</h5>
            <ul className="list-unstyled">
              <li><a href="https://www.instagram.com/_daylapin/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faInstagram} size="lg" /> _daylapin</a></li>
              <li><a href="https://www.facebook.com/pin.vole.3/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFacebook} size="lg" /> pin.vole.3</a></li>
              <li><a href="https://github.com/anhnhat110" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faGithub} size="lg" /> anhnhat110</a></li>
              <li><a href="https://www.linkedin.com/in/v%C3%B5-l%C3%AA-anh-nh%E1%BA%ADt-b93977277/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faLinkedin} size="lg" /> me</a></li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Contact Info</h5>
            <p>Email: voleanhnhat20031@gmail.com</p>
            <p>Phone: +84 898 220 037</p>
            <p>Address: 43/55 Le Huu Trac, An Hai Dong, Son Tra, Da Nang</p>
          </Col>
        </Row>
        <Row className="text-center mt-3">
          <Col>
            <p>&copy; 2024 Vo Le Anh Nhat. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
