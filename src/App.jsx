import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeBody from "./Component/HomeBody";
import Men from "./Pages/Men";
import Women from "./Pages/Women";
import Boys from "./Pages/Boys";
import Girls from "./Pages/Girls";
import Login from "./Pages/Login";
import ShoppingCart from "./ShoppingCart/Shoppingcart";
import Wishlist from "./Pages/Wishlist";

import Register from "./Pages/Register";
import { ToastContainer } from "react-toastify";
import ProductDetail from "./Detail/ProductDetail";
import { Header } from "./Component/Header";
import SearchResults from "./Search/SearchResult";

import OrderSuccess from "./Order/OrderSuccess";
import { useDispatch } from "react-redux";
import { checkAuthStatus } from "./Redux/authSlice";
import { useEffect } from "react";
import Profile from "./Profile/Profile";
import Footer from "./Component/Footer";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomeBody />} />
        <Route path="/home" element={<HomeBody />} />
        <Route path="/men" element={<Men />} />
        <Route path="/women" element={<Women />} />
        <Route path="/boys" element={<Boys />} />
        <Route path="/girls" element={<Girls />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/shoppingcart" element={<ShoppingCart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/success=true" element={<OrderSuccess />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search" element={<SearchResults />} />
      </Routes>
      <ToastContainer />
      <Footer/>
    </Router>
  );
}

export default App;
