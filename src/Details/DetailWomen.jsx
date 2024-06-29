
import ProductDetail from '../Component/ProductDetail'
import Body from '../Component/Body'

export default function DetailWomen() {
  const url="products"
  return (
    <div>
      <ProductDetail url={url}/>
      <Body API={'http://localhost:1338/api/products?populate=*'} collection="Maybe you liked" title="For woman" cat="women" />
    </div>
  )
}
