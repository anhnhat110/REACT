import "../styles/Body.css";
import womenApi from "../API/WomenAPI";
import menApi from "../API/MenAPI";
import boysApi from "../API/BoysAPI"; 
import Slide from "./Slide";
import Body from "./Body";
import girlsApi from "../API/GirlsAPI";
import Footer from "./Footer";


export default function HomeBody() {
  
 
  const productDetailPathMen = "/product-men"
  const productDetailPathWomen = "/product-women"
  const productDetailPathBoys = "/product-boys"
  const productDetailPathGirls = "/product-girls"

  return (
    <div>
      <Slide/>
      <Body API={menApi} collection="All collection" title="For men" productDetailPath={productDetailPathMen}/>
      <Body API={womenApi} title="For woman" productDetailPath={productDetailPathWomen}/>
      <Body API={boysApi} title="For boys" productDetailPath={productDetailPathBoys} />
      <Body API={girlsApi} title="For girls" productDetailPath={productDetailPathGirls}/>
      <Footer/>
    </div>
  );
}
