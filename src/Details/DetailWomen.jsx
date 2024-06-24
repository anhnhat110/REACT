
import ProductDetail from '../Component/ProductDetail'
import womenApi from '../API/WomenAPI'
import Body from '../Component/Body'

export default function DetailWomen() {
  const url="women"
  return (
    <div>
      <ProductDetail url={url}/>
      <Body API={womenApi} collection="Maybe you liked" title="For woman" />
    </div>
  )
}
