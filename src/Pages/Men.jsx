import Body from "../Component/Body";
import Slide from "../Component/Slide"
import homemenApi from "../API/HomemenAPI";
import Footer from "../Component/Footer";

export default function Men() {
  const productDetailPath = "/product-men"
  return (
    <div>
      <Slide /> 
      <Body API={homemenApi} collection="Men collection" title="For men" productDetailPath={productDetailPath}/>
      <Footer/>
    </div>
  );
}
