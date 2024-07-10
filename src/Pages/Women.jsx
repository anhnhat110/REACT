import Body from "../Component/Body";
import Slide from "../Component/Slide";
import Footer from "../Component/Footer";


export default function Women() {
  return (
    <div>
      <Slide />
      <Body collection="Women collection" title="For women" cat="women" />
      <Footer/>
    </div>
  );
}
