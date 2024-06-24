
import ProductDetail from '../Component/ProductDetail'
import homegirlsApi from "../API/HomegirlsAPI";
import Body from '../Component/Body';

export default function DetailGirls() {
  const url="homegirls"
  return (
    <div>
      <ProductDetail url={url}/>
      <Body API={homegirlsApi} collection="Maybe you liked" title="For girls" />
    </div>
  )
}
