
import ProductDetail from '../Component/ProductDetail'
import homeboysApi from '../API/HomeboysAPI'
import Body from '../Component/Body'
export default function DetailBoys() {
  const url="homeboys"
  return (
    <div>
      <ProductDetail url={url}/>
      <Body API={homeboysApi} collection="Maybe you liked" title="For boys" />
    </div>
  )
}
