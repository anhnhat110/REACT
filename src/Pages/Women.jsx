import { Header } from "../Component/Header";
import Body from "../Component/Body";
import Slide from "../Component/Slide";
import homewomenApi from "../API/Homewomen";
export default function Women() {
  return (
    <div>
      <Header />
      <Slide />
      <Body API={homewomenApi} collection="Women collection" title="For women" />
    </div>
  );
}
