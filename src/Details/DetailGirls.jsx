
import ProductDetail from '../Component/ProductDetail'
import Body from '../Component/Body';

export default function DetailGirls() {
  const url="products"
  return (
    <div>
      <ProductDetail url={url}/>
      <Body API={'http://localhost:1338/api/products?populate=*'} collection="Girls collection" title="For girls"  cat='girls' />
    </div>
  )
}
