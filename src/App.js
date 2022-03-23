import "./assets/css/main.css";
import Footer from "./ layout/Footer";
import Header from "./ layout/Header";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Basket from "./pages/Basket";
import ProductDetail from "./pages/ProductDetail";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
        <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Home />} />
          <Route path="/basket" element={<Basket />} />
          <Route path="/products/:id" element={<ProductDetail />} />
        </Routes>
        <Footer />
      </Router >
    </>
  );
}

export default App;