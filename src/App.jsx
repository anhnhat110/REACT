import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Men from "./Pages/Men";
import Women from "./Pages/Women";
import Boys from "./Pages/Boys";
import Girls from "./Pages/Girls";
import Login from "./Pages/Login";
import ShoppingCart from "./Component/Shoppingcart";
import Wishlist from "./Pages/Wishlist";
import ResetPass from "./Pages/ResetPass";
import Register from "./Pages/Register";
import { ToastContainer } from "react-toastify";
import Detail from "./Component/Detail";
import { Header } from "./Component/Header";
import SearchResults from "./Component/SearchResult";
import Profile from "./Pages/Profile";
import OrderSuccess from "./Pages/OrderSuccess";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/men" element={<Men />} />
        <Route path="/women" element={<Women />} />
        <Route path="/boys" element={<Boys />} />
        <Route path="/girls" element={<Girls />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/products/:id" element={<Detail />} />
        <Route path="/shoppingcart" element={<ShoppingCart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/success=true" element={<OrderSuccess />} />
        <Route path="/resetpassword" element={<ResetPass />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search" element={<SearchResults />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
