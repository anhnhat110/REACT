
import ProductDetail from '../Component/ProductDetail'
import Body from '../Component/Body'
export default function DetailMen() {
  const url="products"
    const productDetailPath = "/product-men"
  return (
    <div>
      <ProductDetail url={url}/>
      <Body API={'http://localhost:1338/api/products?populate=*'} collection="Maybe you liked" title="For men" productDetailPath={productDetailPath} cat="men"/>
    </div>
  )
}
