import "./assets/css/main.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Info from "./components/Info";
import Products from "./components/Products";
import { BrowserRouter as Router, Route, } from "react-router-dom";
import Basket from "./components/Basket";

function App() {
  return (
    <>
      <Router>
          <Route path="/" exact>
            <Header />
            <main>
              <Info />
              <Products />
            </main>
            <Footer />
          </Route>

          <Route path="/basket">
            <Header />
            <Basket />
            <Footer />
          </Route>
      </Router >
    </>
  );
}

export default App;