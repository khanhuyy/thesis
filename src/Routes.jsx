import React from "react";
import { Route, Routes, useParams } from "react-router-dom";
import Home from "./component/home/Home";
import KidsWear from "./component/ProductPage/KidsWear";
import MensWear from "./component/ProductPage/MensWear";
import Order from "./component/order/Order";
import OrderDetail from "./component/order/OrderDetail";
import OrderPagination from "./component/order/OrderPagination";
import WomensWear from "./component/ProductPage/WomensWear";

import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Shop from "./component/shop/Shop";
import Warehouse from "./component/warehouse/Warehouse";
import AdminPageLogin from "./component/AdminDataBase/AdminPageLogin";
import AdminPanel from "./component/AdminDataBase/AdminPanel";
import Admin from "./component/singlePage/Admin";
import SingleProduct from "./component/singlePage/SingleProduct";
import ProductPagination from "./component/ProductPage/ProductPagination";
import { Address } from "./component/cart/Address";
import Payment from "./pages/Payment";
import Otp from "./pages/Otp";
import PaymentSuccess from "./pages/PaymentSuccess";
import PrivateRoutes from "./component/PrivateRoutes/PrivateRoutes";
import PaymentPage from "./component/Rahul/PaymentPage/PaymentPage";
import Profile from "./component/user/Profile";
import CartPage from "./component/Rahul/Cart/CartPage";
import OrderSucess from "./component/Rahul/PaymentPage/OrderSucess";
import CreateNewProduct from "./component/singlePage/CreateNewProduct";
import UpdateProduct from "./component/singlePage/UpdateProduct";

const AllRoutes = () => {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/categories/:id" element={<ProductPagination />}/>
      <Route path="/createProduct" element={<CreateNewProduct />}></Route>
      <Route path="/kids" element={<KidsWear />} />
      <Route path="/mens" element={<MensWear />} />
      <Route path="/orders" element={<OrderPagination />} />
      <Route path="/orders/:orderId" element={<OrderDetail />} />
      <Route path="/womens" element={<WomensWear />} />
      <Route path="/warehouses" element={<Warehouse />} />
      
      <Route
        path="/carts"
        element={
          <PrivateRoutes>
            <CartPage />
          </PrivateRoutes>
        }
      />
      <Route path="/shops" element={<Shop />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/paymentPage" element={<PaymentPage />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/orderSuccess" element={<OrderSucess />} />

      <Route path="/kidsproduct/:id" element={<SingleProduct />} />
      <Route path="/products/:id" element={<SingleProduct />} />
      <Route path="/products/:id/update" element={<UpdateProduct />} />
      <Route path="*" element={<h2>Page not found...</h2>} />
    </Routes>
  );
};

export default AllRoutes;
