import { useEffect, useState } from "react";
import Header from "./components/layout/Header/Header";
import { Route, Routes } from "react-router-dom";
import webFont from "webfontloader";
import Footer from "./components/layout/Footer/Footer";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import ProductDetail from "./components/Product/ProductDetail";
import Products from "./components/Product/Products";
import Login from "./components/User/Login";
import SignUp from "./components/User/SignUp";
import store from "./reduxStore/store";
import { loadUser } from "./reduxStore/actions/userAction";
import SearchField from "./components/ui/SearchField";
import { useSelector } from "react-redux";
import UserOptions from "./components/layout/Header/UserOptions";
import Profile from "./components/User/Profile";
import ProtectedRoute from "./components/Routes/ProtectedRoute";
import UpdateProfile from "./components/User/UpdateProfile";
import UpdatePassword from "./components/User/UpdatePassword";
import ForgotPassword from "./components/User/ForgotPassword";
import ResetPassword from "./components/User/ResetPassword";
import Cart from "./components/Cart/Cart";
import Shipping from "./components/Cart/Shipping";
import ConfirmOrder from "./components/Cart/ConfirmOrder";
import OrderSuccess from "./components/Cart/OrderSuccess";
import axios from "axios";
import MyOrders from "./components/Orders/MyOrders";
import OrderDetails from "./components/Orders/OrderDetails";
// import Payment from "./components/Cart/Payment";
import OrderFailed from "./components/Cart/OrderFailed";
import Dashboard from "./components/Admin/Dashboard";
import ProductList from "./components/Admin/ProductList";
import UpdateProduct from "./components/Admin/UpdateProduct";
import NewProduct from "./components/Admin/NewProduct";
import OrderList from "./components/Admin/OrderList";
import ProcessOrder from "./components/Admin/ProcessOrder";
import UsersList from "./components/Admin/UsersList";
import UpdateUser from "./components/Admin/UpdateUser";
import ProductReviews from "./components/Admin/ProductReviews";
import NotFound from "./components/layout/NotFound/NotFound";
import Blog from "./components/Blog/Blog";
import Career from "./components/Career/Career";
import TrackOrder from "./components/TrackOrder/TrackOrder";
import Return from "./components/Return/Return";
import Faqs from "./components/Faqs/Faqs";
import Privacy from "./components/Policies/Privacy";
import ReturnExchange from "./components/Policies/ReturnExchange";
import TermCondition from "./components/Policies/TermCondition";
import ShippingPolicy from "./components/Policies/ShippingPolicy";
const apiUrl = import.meta.env.VITE_API_URL;

const App = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [razorpayApiKey, setRazorpayApiKey] = useState("");

  async function getRazorpayApiKey() {
    const { data } = await axios.get(
      `${apiUrl}/api/v1/razorpayapikey`,
      { withCredentials: true }
    );
    setRazorpayApiKey(data.razorpayApiKey);
  }
  useEffect(() => {
    webFont.load({
      google: {
        families: ["Poppins", "Nunito", "Roboto"],
      },
    });

    store.dispatch(loadUser());

    getRazorpayApiKey();
  }, []);

  return (
    <div className="w-full min-h-screen bg-bgColor">
      <div className="w-full h-[78px] flex justify-center items-center pt-3 pb-2">
        <Header />
      </div>
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route path="/" exact Component={Home} />
        <Route exact path="/about" Component={About} />
        <Route exact path="/contact" Component={Contact} />
        <Route exact path="/blogs" Component={Blog} />
        <Route exact path="/career" Component={Career} />
        <Route exact path="/myorder/track" Component={TrackOrder} />
        <Route exact path="/return" Component={Return} />
        <Route exact path="/faqs" Component={Faqs} />
        <Route exact path="/privacy" Component={Privacy} />
        <Route exact path="/return/policy" Component={ReturnExchange} />
        <Route exact path="/terms" Component={TermCondition} />
        <Route exact path="/shipping/policy" Component={ShippingPolicy} />
        <Route exact path="/product/:id" Component={ProductDetail} />
        <Route exact path="/products" Component={Products} />
        <Route path="/products/:keyword" Component={Products} />
        <Route exact path="/search" Component={SearchField} />
        <Route exact path="/login" Component={Login} />
        <Route exact path="/signup" Component={SignUp} />
        <Route
          exact
          path="/account"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/me/update"
          element={
            <ProtectedRoute>
              <UpdateProfile />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/password/update"
          element={
            <ProtectedRoute>
              <UpdatePassword />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/shipping"
          element={
            <ProtectedRoute>
              <Shipping />
            </ProtectedRoute>
          }
        />
        <Route exact path="/shipping" Component={Shipping} />

        <Route
          exact
          path="/order/confirm"
          element={
            <ProtectedRoute>
              <ConfirmOrder razorpayApiKey={razorpayApiKey} />
            </ProtectedRoute>
          }
        />

        <Route exact path="/password/forgot" Component={ForgotPassword} />
        <Route exact path="/password/reset/:token" Component={ResetPassword} />
        <Route exact path="/cart" Component={Cart} />

        <Route
          exact
          path="/success"
          element={
            <ProtectedRoute>
              <OrderSuccess />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/order/failed"
          element={
            <ProtectedRoute>
              <OrderFailed />
            </ProtectedRoute>
          }
        />

        <Route
          exact
          path="/orders"
          element={
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/order/:id"
          element={
            <ProtectedRoute>
              <OrderDetails />
            </ProtectedRoute>
          }
        />
        {/* <Route
          exact
          path="/process/payment"
          element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          }
        /> */}

        <Route
          exact
          path="/admin/dashboard"
          element={
            <ProtectedRoute isAdmin={true}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/admin/products"
          element={
            <ProtectedRoute>
              <ProductList />
              isAdmin={true}
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/admin/product"
          element={
            <ProtectedRoute>
              <NewProduct />
              isAdmin={true}
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/admin/product/:id"
          element={
            <ProtectedRoute>
              <UpdateProduct />
              isAdmin={true}
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/admin/orders"
          element={
            <ProtectedRoute>
              <OrderList />
              isAdmin={true}
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/admin/order/:id"
          element={
            <ProtectedRoute>
              <ProcessOrder />
              isAdmin={true}
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/admin/users"
          element={
            <ProtectedRoute>
              <UsersList />
              isAdmin={true}
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/admin/user/:id"
          element={
            <ProtectedRoute>
              <UpdateUser />
              isAdmin={true}
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/admin/reviews"
          element={
            <ProtectedRoute>
              <ProductReviews />
              isAdmin={true}
            </ProtectedRoute>
          }
        />

        <Route Component={NotFound} />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
