
import "./App.css"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Body from "./components/Body";
// import  Header  from "./components/Header";
import Home from "./components/Home";
import Men from "./components/Men";
import Women from "./components/Women";
import Boys from "./components/Boys";
import Girls from "./components/Girls";

function App() {
  return (
    <>
    <Router>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/home" element={<Home/>} />
      <Route path="/men" element={<Men/>} />
      <Route path="/women" element={<Women/>} />
      <Route path="/boys" element={<Boys/>} />
      <Route path="/girls" element={<Girls/>} />
    </Routes>
    </Router>
    </>
  );
}

export default App;
