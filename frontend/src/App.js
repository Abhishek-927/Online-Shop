import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home"; //done
import About from "./pages/About"; //done
import Policy from "./pages/Policy"; //done
import PageNotFound from "./pages/PageNotFound"; //done
import Header from "./components/layout/Header"; //done
import Footer from "./components/layout/Footer"; //done
import Resister from "./pages/auth/Resister"; //done
import Contact from "./pages/Contact"; //done
import Login from "./pages/auth/Login"; //done
import Dashboard from "./pages/user/Dashboard"; //done
import Private from "./components/layout/routes/Private"; //done
import PrivateAdminRoute from "./components/layout/routes/AdminRoute"; //done
import AdminDashboard from "./pages/admin/AdminDashboard"; //done
import CreateCategory from "./pages/admin/CreateCategory"; //done
import CreateProduct from "./pages/admin/CreateProduct"; //done
import Users from "./pages/admin/Users"; //dome
import Order from "./pages/user/Order"; //done
import Profile from "./pages/user/Profile"; //done
import Products from "./pages/admin/Products"; //done
import UpdateProduct from "./pages/admin/UpdateProduct"; //sonw
import Search from "./pages/Search"; //done
import ProductDetails from "./pages/ProductDetails"; //done
import Categories from "./pages/Categories"; //done
import Category from "./pages/Category"; //done
import Card from "./pages/Card"; //done
import AdminOrders from "./pages/admin/AdminOrders"; //done
import Payment from "./pages/Payment"; //done

import { AuthProvider } from "./context/auth";
import { CardProvider } from "./context/cardContext";
import { SearchProvider } from "./context/searchContext";

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
                <Route path="admin" element={<AdminDashboard />} />
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
                <Route path="user" element={<Dashboard />}></Route>
                <Route path="user/order" element={<Order />}></Route>
                <Route path="user/profile" element={<Profile />}></Route>
              </Route>
              <Route path="/about" element={<About />}></Route>
              <Route path="/payment/:id" element={<Payment />}></Route>
              <Route path="/contact" element={<Contact />}></Route>
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
