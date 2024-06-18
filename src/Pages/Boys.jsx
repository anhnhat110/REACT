import { Header } from "../Component/Header";
import Body from "../Component/Body";
import homeboysApi from "../API/HomeboysAPI";
import Slide from "../Component/Slide";
export default function Boys() {
  return (
    <div>
      <Header/>
      <Slide/>
      <Body API={homeboysApi} collection="Boys collection" title="For boys"/>
    </div>
  );
}
