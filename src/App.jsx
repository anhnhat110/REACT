import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Men from "./Pages/Men";
import Women from "./Pages/Women";
import Boys from "./Pages/Boys";
import Girls from "./Pages/Girls";
import Login from "./Pages/Login";
import ShoppingCart from "./Component/Shoppingcart";
import HeartBag from "./Pages/HeartBag";
import ResetPass from "./Pages/ResetPass";
import Register from "./Pages/Register";
import { ToastContainer } from "react-toastify";
import DetailBoys from "./Details/DetailBoys";
import DetailGirls from "./Details/DetailGirls";
import DetailMen from "./Details/DetailMen";
import DetailWomen from "./Details/DetailWomen";
import { Header } from "./Component/Header";
import { CartProvider } from "./Component/CartContext";
import { FavProvider } from "./Component/FavContext"; 

import SearchResults from "./Component/SearchResult";

function App() {
  return (
    <CartProvider>
    <FavProvider>
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
          <Route path="/products/:id" element={<DetailBoys />} />
          <Route path="/products/:id" element={<DetailGirls />} />
          <Route path="/products/:id" element={<DetailMen />} />
          <Route path="/products/:id" element={<DetailWomen />} />
          <Route path="/shoppingcart" element={<ShoppingCart />} />
          <Route path="/heartbag" element={<HeartBag />} />
          <Route path="/resetpassword" element={<ResetPass />} />
          <Route path="/register" element={<Register />} />
          <Route path="/search" element={<SearchResults/>}/>
        </Routes>
        <ToastContainer />
      </Router>
      </FavProvider>
    </CartProvider>
    
  );
}

export default App;
