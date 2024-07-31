import Body from "../Component/Body";
import Slide from "../Carousel/Slide";
export default function Boys() {
  // Đường dẫn chi tiết sản phẩm
  return (
    <div>
      <Slide />
      <Body collection="Boys collection" title="For boys" cat="boys" />
    </div>
  );
}
