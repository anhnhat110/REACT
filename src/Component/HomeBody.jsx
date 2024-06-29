import "../styles/Body.css";
import Slide from "./Slide";
import Body from "./Body";
import Footer from "./Footer";


export default function HomeBody() {
  
 
  

  return (
    <div>
      <Slide/>
      <Body API={'http://localhost:1338/api/products?populate=*'} collection="All collection" title="For men" cat="men"/>
      <Body API={'http://localhost:1338/api/products?populate=*'} title="For woman" cat="women" />
      <Body API={'http://localhost:1338/api/products?populate=*'} title="For boys" cat="boys" productDetail='product-boys'/>
      <Body API={'http://localhost:1338/api/products?populate=*'} title="For girls" cat="girls" />
      <Footer/>
    </div>
  );
}
