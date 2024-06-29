import Body from "../Component/Body";
import Slide from "../Component/Slide";
import Footer from "../Component/Footer";
export default function Girls() {
  return (
    <div>
      <Slide/>
      <Body API={'http://localhost:1338/api/products?populate=*'} collection="Girls collection" title="For girls"  cat='girls' />
      <Footer/>
    </div>
  );
}
