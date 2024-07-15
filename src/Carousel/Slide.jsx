import bg1 from "../assets/background1.jpg";
import bg2 from "../assets/background2.jpg";
import bg3 from "../assets/background3.jpg";
import { Carousel } from "react-bootstrap";
import "../styles/Slide.css";

export default function Slide() {
  return (
    <Carousel fade className="Slide">
      <Carousel.Item interval={2000}>
        <img className="background" src={bg1} alt="First slide" />
        <Carousel.Caption>
          <h3>Maverick - Elevate Your Style</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <img className="background" src={bg2} alt="Second slide" />
        <Carousel.Caption>
          <h3>
            Embrace Individuality with Maverick - A Premium Clothing Brand
          </h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <img className="background" src={bg3} alt="Third slide" />
        <Carousel.Caption>
          <h3>Dress Well with Maverick - Enhance Your Self-Worth</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}
