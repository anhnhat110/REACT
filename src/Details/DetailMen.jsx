
import ProductDetail from '../Component/ProductDetail'
import menApi from '../API/MenAPI'
import Body from '../Component/Body'
export default function DetailMen() {
  const url="men"
  return (
    <div>
      <ProductDetail url={url}/>
      <Body API={menApi} collection="Maybe you liked" title="For men" />
    </div>
  )
}
