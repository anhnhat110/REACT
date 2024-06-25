
import ProductDetail from '../Component/ProductDetail'

import Body from '../Component/Body'
export default function DetailBoys() {
  const url="products"
  const productDetailPath = "/product-boys"
  return (
    <div>
      <ProductDetail url={url}/>
      <Body API={'http://localhost:1338/api/products?populate=*'} collection="Maybe you liked" title="For boys" productDetailPath={productDetailPath} cat="boys" />
    </div>
  )
}
