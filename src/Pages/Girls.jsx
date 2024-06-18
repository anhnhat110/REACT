import { Header } from "../Component/Header";
import Body from "../Component/Body";
import homegirlsApi from "../API/HomegirlsAPI";
import Slide from "../Component/Slide";
export default function Boys() {
  return (
    <div>
      <Header/>
      <Slide/>
      <Body API={homegirlsApi} collection="Girls collection" title="For girls"/>
    </div>
  );
}
