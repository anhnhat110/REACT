import Body from "../Component/Body";
import homegirlsApi from "../API/HomegirlsAPI";
import Slide from "../Component/Slide";
import Footer from "../Component/Footer";
export default function Girls() {
  const productDetailPath = "/product-girls"
  return (
    <div>
      <Slide/>
      <Body API={homegirlsApi} collection="Girls collection" title="For girls" productDetailPath={productDetailPath}/>
      <Footer/>
    </div>
  );
}
