import { useEffect, useState } from "react";
import Header from "./components/layout/Header/Header";
import { Route, Routes } from "react-router-dom";
import webFont from "webfontloader";
import Footer from "./components/layout/Footer/footer";
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
import MyOrder from "./components/Orders/MyOrder";
import OrderDetails from "./components/Orders/OrderDetails";

const App = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    webFont.load({
      google: {
        families: ["Poppins", "Nunito", "Roboto"],
      },
    });

    store.dispatch(loadUser());

    getStripeApiKey();
  }, []);

  return (
    <div className="w-full bg-bgColor">
      <div className="w-full h-[78px] flex justify-center items-center pt-3 pb-2">
        <Header />
      </div>
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route path="/" exact Component={Home} />
        <Route exact path="/about" Component={About} />
        <Route exact path="/contact" Component={Contact} />
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
        <Route exact path="/shipping" Component={Shipping} />

        <Route
          exact
          path="/order/confirm"
          element={
            <ProtectedRoute>
              <ConfirmOrder />
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

        {/* <Route
          component={
            window.location.pathname === "/process/payment" ? null : NotFound
          }
        /> */}

        <Route
          exact
          path="/orders"
          element={
            <ProtectedRoute>
              <MyOrder />
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
      </Routes>

      <Footer />
    </div>
  );
};

export default App;

// <ProtectedRoute children={<Profile />} />
