import "./App.css";
import { MainPage } from "./pages/main_page";
import { ProductPage } from "./pages/product_pade";
import { Cart } from "./pages/cart";
import { Payment } from "./pages/payment";
import { Error } from "./pages/error";
import { AdminPage } from "./pages/admin_page";
import { AdminList } from "./pages/admin_list";
import { AdminCreate } from "./pages/admin_create";
import { Routes, Route, Link } from "react-router-dom";
import { PrivacyPolicy } from "./pages/privacy_policy";

function App() {
  return (
    <>
      {/* <ProductPage product={products[0]}/> */}
      {/* <MainPage /> */}
      {/* <Cart /> */}
      {/* <Payment /> */}

      <Routes>
        <Route path="/" element={<MainPage />}/>
        <Route path="/product/:id" element={<ProductPage />}/>
        <Route path="/cart" element={<Cart />}/>
        <Route path="/payment/:price" element={<Payment />}/>
        <Route path="/admin" element={<AdminPage />}/>
        <Route path="/admin/list" element={<AdminList />}/>
        <Route path="/admin/create" element={<AdminCreate />}/>
        <Route path="privacy-policy" element={<PrivacyPolicy />}/>
        <Route path="*" element={<Error />}/>
      </Routes>
    </>
  );
}

export default App;
