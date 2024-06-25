import Body from "../Component/Body";
import Slide from "../Component/Slide";
import Footer from "../Component/Footer";

export default function Boys() {
  const productDetailPath = "/product-boys"; // Đường dẫn chi tiết sản phẩm
  return (
    <div>
      <Slide />
      <Body API={'http://localhost:1338/api/products?populate=*'} collection="Boys collection" title="For boys" productDetailPath={productDetailPath} cat= "boys"/>

      <Footer/>
    </div>
  );
}
