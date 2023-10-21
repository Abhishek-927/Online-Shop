import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Policy from "./pages/Policy";
import PageNotFound from "./pages/PageNotFound";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Resister from "./pages/auth/Resister";
import Contect from "./pages/Contect";
import Login from "./pages/auth/Login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Router>
        <Header />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/contect" element={<Contect />}></Route>
          <Route path="/policy" element={<Policy />}></Route>
          <Route path="/signup" element={<Resister />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
