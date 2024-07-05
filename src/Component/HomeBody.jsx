import "../styles/Body.css";
import Slide from "./Slide";
import Body from "./Body";
import Footer from "./Footer";

export default function HomeBody() {
  return (
    <div>
      <Slide />
      <Body collection="All collection" title="For men" cat="men" />
      <Body title="For women" cat="women" />
      <Body title="For boys" cat="boys" />
      <Body title="For girls" cat="girls" />
      <Footer />
    </div>
  );
}

