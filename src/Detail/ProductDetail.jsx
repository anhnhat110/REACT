import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../Redux/cartSlice";
import { addToFav, removeFromFav } from "../Redux/wishlistSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchProductById } from "../service/productService";
import "../styles/ProductDetail.css";
import Body from "../Component/Body";
import LogoHeart from "../assets/LogoHeart";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();

const ProductDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const dispatch = useDispatch();
  const favItems = useSelector((state) => state.wishlist.favItems);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const product = await fetchProductById(id);
        setData(product.data);
      } catch (error) {
        console.error("Error fetching the product details:", error);
      }
    };
    fetchData();
  }, [id]);

  const handleLiked = (item) => {
    if (!isLoggedIn) {
      toast.error("You need to log in");
      return;
    }

    const isFav = favItems.some((favItem) => favItem.id === item.id);
    const product = {
      id: item.id,
      name: item.attributes.name,
      image: item.attributes.image?.data[0]?.attributes.url,
      price: item.attributes.price,
    };

    if (isFav) {
      dispatch(removeFromFav(item.id));
    } else {
      dispatch(addToFav(product));
    }
  };

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      toast.error("You need to log in");
      return;
    }
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }
    const product = {
      id: data.id,
      name: data.attributes.name,
      image: data.attributes.image?.data[0]?.attributes.url,
      price: data.attributes.price,
      size: selectedSize,
      quantity: 1, // Mặc định quantity là 1 khi thêm vào giỏ hàng
    };
    dispatch(addToCart(product));
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  const { attributes } = data;

  return (
    <Container>
      <ToastContainer />
      <Row className="products">
        <Col sm={6} md={3}>
          {attributes.image && attributes.image.data.length > 0 && (
            <img
              className="product-image"
              src={`http://localhost:1338${attributes.image.data[0].attributes.url}`}
              alt={attributes.image.data[0].attributes.name}
            />
          )}
        </Col>
        <Col md={6} className="detail">
          <div className="product-title">
            <h1>{attributes.name}</h1>
            <LogoHeart
              className="heart-button-detail"
              isFav={favItems.some((favItem) => favItem.id === data.id)}
              onClick={() => handleLiked(data)}
            ></LogoHeart>
          </div>
          <p>{attributes.description}</p>
          <h5>Price: {Number(attributes.price).toLocaleString()}$</h5>
          <div>
            {attributes.size.map((size) => (
              <div
                className="button-size"
                key={size.id}
                onClick={() => setSelectedSize(size.name)}
              >
                <Button
                  variant={selectedSize === size.name ? "dark" : "outline-dark"}
                >
                  {size.name}
                </Button>
              </div>
            ))}
          </div>
          <p className="button-add-to-cart" onClick={handleAddToCart}>
            Add to Cart
          </p>
          <p>Call to Hotline: 0363652758</p>
        </Col>
      </Row>
      <Body
        collection="Related Products"
        title="You might also like"
        cat={attributes.categories.data[0]?.attributes.name} // Pass the category name
      />
    </Container>
  );
};

export default ProductDetail;
