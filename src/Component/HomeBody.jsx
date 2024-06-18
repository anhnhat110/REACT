import "../styles/Body.css";
import womenApi from "../API/WomenAPI";
import menApi from "../API/MenAPI";
import boysApi from "../API/BoysAPI"; 
import { Header } from "./Header";
import Slide from "./Slide";
import Body from "./Body";
import girlsApi from "../API/GirlsAPI";


export default function HomeBody() {
  
  // const [likedProducts, setLikedProducts] = useState({});

  // const HandlerLiked = (id) => {
  //   const updatedLikedProducts = { ...likedProducts };
  //   updatedLikedProducts[id] = !likedProducts[id];
  //   setLikedProducts(updatedLikedProducts);
  // };
  return (
    <div>
      <Header/>
      <Slide/>
      <Body API={menApi} collection="All collection" title="For men"/>
      <Body API={womenApi} title="For woman"/>
      <Body API={boysApi} title="For boys"/>
      <Body API={girlsApi} title="For girls"/>
    </div>
  );
}
