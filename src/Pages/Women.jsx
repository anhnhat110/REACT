import Body from "../Component/Body";
import Slide from "../Component/Slide";
import Footer from "../Component/Footer";
export default function Women() {
  const productDetailPath = "/product-women"
  return (
    <div>
      <Slide />
      <Body API={'http://localhost:1338/api/products?populate=*'} collection="Women collection" title="For women" productDetailPath={productDetailPath} cat="women"/>
      <Footer/>
    </div>
  );
}
