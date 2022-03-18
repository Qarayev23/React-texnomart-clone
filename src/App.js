import "./assets/css/main.css";
import Footer from "./ layout/Footer";
import Header from "./ layout/Header";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Basket from "./pages/Basket";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/basket" element={<Basket />} />
        </Routes>
        <Footer />
      </Router >
    </>
  );
}

export default App;