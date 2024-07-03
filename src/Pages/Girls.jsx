import Body from "../Component/Body";
import Slide from "../Component/Slide";
import Footer from "../Component/Footer";
export default function Girls() {
  return (
    <div>
      <Slide/>
      <Body collection="Girls collection" title="For girls"  cat='girls' />
      <Footer/>
    </div>
  );
}
