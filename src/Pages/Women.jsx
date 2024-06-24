import Body from "../Component/Body";
import Slide from "../Component/Slide";
import homewomenApi from "../API/Homewomen";
import Footer from "../Component/Footer";
export default function Women() {
  const productDetailPath = "/product-women"
  return (
    <div>
      <Slide />
      <Body API={homewomenApi} collection="Women collection" title="For women" productDetailPath={productDetailPath} />
      <Footer/>
    </div>
  );
}
