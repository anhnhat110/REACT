import "../styles/Body.css";
import Slide from "../Carousel/Slide";
import LandingPage from "./LandingPage";

export default function HomeBody() {
  return (
    <div>
      <Slide />
      <LandingPage
        collection="All collection"
        title="For men"
        cat="men"
        limit={4}
      />
      <LandingPage title="For women" cat="women" limit={4} />
      <LandingPage title="For boys" cat="boys" limit={4} />
      <LandingPage title="For girls" cat="girls" limit={4} />
    </div>
  );
}
