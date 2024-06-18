import "./App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./Pages/Home";
import Men from "./Pages/Men";
import Women from "./Pages/Women";
import Boys from "./Pages/Boys";
import Girls from "./Pages/Girls";
import User from "./Pages/User";
import ResetPass from "./Pages/ResetPass";
import Register from "./Pages/Register";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/men" element={<Men />} />
        <Route path="/women" element={<Women />} />
        <Route path="/boys" element={<Boys />} />
        <Route path="/girls" element={<Girls />} />
        <Route path="/user" element={<User />}/> 
        <Route path="/resetpassword" element={<ResetPass />}/>
        <Route path="/register" element={<Register />}/>
      </Routes>
    </Router>
  );
}

export default App;
