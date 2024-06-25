
import ProductDetail from '../Component/ProductDetail'
import Body from '../Component/Body';

export default function DetailGirls() {
  const url="products"
    const productDetailPath = "/product-girls"
  return (
    <div>
      <ProductDetail url={url}/>
      <Body API={'http://localhost:1338/api/products?populate=*'} collection="Maybe you liked" title="For girls" productDetailPath={productDetailPath} cat="girls" />
    </div>
  )
}
