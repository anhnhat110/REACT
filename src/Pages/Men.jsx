import Body from "../Component/Body";
import Slide from "../Component/Slide"
import Footer from "../Component/Footer";

export default function Men() {
  const productDetailPath = "/product-men"
  return (
    <div>
      <Slide /> 
      <Body API={'http://localhost:1338/api/products?populate=*'} collection="Men collection" title="For men" productDetailPath={productDetailPath} cat="men"/>
      <Footer/>
    </div>
  );
}
