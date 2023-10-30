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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/auth";
import Deshboard from "./pages/user/Deshboard";
import Private from "./components/layout/routes/Private";
import PrivateAdminRoute from "./components/layout/routes/AdminRoute";
import AdminDeshboard from "./pages/admin/AdminDeshboard";
import CreateCategory from "./pages/admin/CreateCategory";
import CreateProduct from "./pages/admin/CreateProduct";
import Users from "./pages/admin/Users";
import Order from "./pages/user/Order";
import Profile from "./pages/user/Profile";
import Products from "./pages/admin/Products";
import UpdateProduct from "./pages/admin/UpdateProduct";
import { SearchProvider } from "./context/searchContext";
import Search from "./pages/Search";
import ProductDetails from "./pages/ProductDetails";
import Categories from "./pages/Categories";
import Category from "./pages/Category";
import { CardProvider } from "./context/cardContext";
import Card from "./pages/Card";
import AdminOrders from "./pages/admin/AdminOrders";
import Payment from "./pages/Payment";

function App() {
  return (
    <AuthProvider>
      <SearchProvider>
        <CardProvider>
          <Router>
            <Header />
            <ToastContainer />
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/categories" element={<Categories />}></Route>
              <Route path="/cart" element={<Card />}></Route>
              <Route path="/category/:slug" element={<Category />}></Route>
              <Route path="/dashboard" element={<PrivateAdminRoute />}>
                <Route path="admin" element={<AdminDeshboard />} />
                <Route
                  path="admin/create-category"
                  element={<CreateCategory />}
                />
                <Route
                  path="admin/create-product"
                  element={<CreateProduct />}
                />
                <Route path="admin/product/:slug" element={<UpdateProduct />} />
                <Route path="admin/products" element={<Products />} />
                <Route path="admin/users" element={<Users />} />
                <Route path="admin/orders" element={<AdminOrders />} />
              </Route>
              <Route path="/dashboard" element={<Private />}>
                <Route path="user" element={<Deshboard />}></Route>
                <Route path="user/order" element={<Order />}></Route>
                <Route path="user/profile" element={<Profile />}></Route>
              </Route>
              <Route path="/about" element={<About />}></Route>
              <Route path="/payment/:id" element={<Payment />}></Route>
              <Route path="/contect" element={<Contect />}></Route>
              <Route path="/policy" element={<Policy />}></Route>
              <Route path="/signup" element={<Resister />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/search" element={<Search />}></Route>
              <Route path="/product/:slug" element={<ProductDetails />}></Route>
              <Route path="*" element={<PageNotFound />}></Route>
            </Routes>
            <Footer />
          </Router>
        </CardProvider>
      </SearchProvider>
    </AuthProvider>
  );
}

export default App;
