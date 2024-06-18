import { Header } from "../Component/Header";
import Body from "../Component/Body";
import Slide from "../Component/Slide"
import homemenApi from "../API/HomemenAPI";

export default function Men() {
  return (
    <div>
      <Header />
      <Slide /> 
      <Body API={homemenApi} collection="Men collection" title="For men"/>
    </div>
  );
}
