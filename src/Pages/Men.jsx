import Body from "../Component/Body";
import Slide from "../Carousel/Slide";
import Footer from "../Component/Footer";

export default function Men() {
  return (
    <div>
      <Slide />
      <Body collection="Men collection" title="For men" cat="men" />
      <Footer />
    </div>
  );
}
