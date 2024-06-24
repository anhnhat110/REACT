import Body from "../Component/Body";
import homeboysApi from "../API/HomeboysAPI";
import Slide from "../Component/Slide";
import Footer from "../Component/Footer";

export default function Boys() {
  const productDetailPath = "/product-boys"; // Đường dẫn chi tiết sản phẩm
  return (
    <div>
      <Slide />
      <Body API={homeboysApi} collection="Boys collection" title="For boys" productDetailPath={productDetailPath} />
      <Footer/>
    </div>
  );
}
